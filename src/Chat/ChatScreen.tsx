import { StyleSheet, Text, View, ScrollView, TextInput, Keyboard, Platform } from 'react-native';
import React, { useCallback, useEffect, useRef, useState } from 'react';
import { RouteProp, useRoute } from '@react-navigation/native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import io from 'socket.io-client';
import Config from 'react-native-config';

import { TNavParams } from '@src/navigation/RootNavigator';
import { getMessages, postMessage, checkOrCreateRoom } from './chatApi';
import { FullScreenTemplate, spacing, colors, Icon } from '@src/components';
import { ChatDto } from './chat.dto';
import { useKeyboardHeight } from '@src/utils/hooks/useKeyboardHeight';

const TEXT_INPUT_HEIGHT = 40;

export const ChatScreen = () => {

  const [roomId, setRoomId] = useState<string | null>(null);
  const [messages, setMessages] = useState<ChatDto.Message[] | []>([]);
  const [textMessage, setTextMessage] = useState('');
  const [extraMarginBottom, setExtraMarginBottom] = useState(false)
 
  const route = useRoute<RouteProp<TNavParams, 'Chat'>>();
  const scrollRef = useRef<ScrollView>(null);
  const socketRef = useRef<any>(null);
  const { bottom } = useSafeAreaInsets();

  const keyboardHeight = useKeyboardHeight();
 
  socketRef.current = io(Config.DOMAIN_URL);

  const { adId, authorId, userId} = route.params;

  const checkRoomMembersAndGetMessages = useCallback( async() => {
      const id = await checkOrCreateRoom(adId, authorId, userId);
      if(id) {
        setRoomId(id)
      } 
  }, [setRoomId, adId, authorId, userId]);

  const getData = useCallback( async() => {
    const data = await getMessages(roomId as string);
      setMessages(data);
  }, [setMessages, roomId]);
  
  useEffect(()=>{
    socketRef.current.on("message", (message: ChatDto.Message) => {
      console.log('MESSAGE', message)
      setMessages(prevState => [...prevState, message]);
      scrollRef.current?.scrollToEnd()
    });
    checkRoomMembersAndGetMessages();
  }, [checkRoomMembersAndGetMessages, socketRef, setMessages]);

  useEffect(() => {
    if(roomId !== null){
      socketRef.current.emit('join', roomId);
      getData();
    }
  }, [roomId, getData])

  const sendMessage = async () => {
    if(textMessage !== ''){
      await postMessage(textMessage, roomId as string, userId);
      setTextMessage('');
      Keyboard.dismiss();
  }
};
  
  return (
    <FullScreenTemplate
     safeArea
     paddedHotizontaly
     scrollRef={scrollRef}
     footer={
      <View style={[styles.textInputContainer, {bottom}, Platform.OS === 'ios' && extraMarginBottom && {marginBottom: keyboardHeight - TEXT_INPUT_HEIGHT}]}>
        <TextInput
          style={styles.textInput}
          value={textMessage}
          onChangeText={setTextMessage}
          autoCapitalize="none"
          blurOnSubmit
          onFocus={()=> setExtraMarginBottom(true)}
        />
        <View style={styles.texInputIconContainer}>
          <Icon name="send-outline" size={20} color={colors.black} onPress={sendMessage} />
        </View>
      </View>
    }
    >

      <View style={styles.container}>
        {messages.map(message => (
          <View key={message.id} style={styles.content}> 
            <Text style={[styles.messageText, message.user_id === route.params.userId ? {backgroundColor: colors.primary, alignSelf: 'flex-end'} : {backgroundColor: colors.secondary }]}>{message.text}</Text>
          </View>
        ))}  
      </View>
  </FullScreenTemplate>
  )
};

const styles = StyleSheet.create({
  container: {
    paddingBottom: spacing.large
  },
  scrollView: {
    marginHorizontal: spacing.large,
  },
  scrollViewContainer: {
    flexGrow: 1
  },
  content: {
    flex:1,
    justifyContent: 'space-between',
  },
  messageText: {
    fontSize: 14,
    width: '40%',
    height: 'auto',
    borderRadius: spacing.regular,
    overflow: 'hidden',
    padding: spacing.small,
    marginVertical: spacing.xxxLarge,
  },
  textInputContainer: {
    flex: 1,
    flexDirection: 'row',
  },
  textInput: {
    flex: 0.9,
    backgroundColor: colors.blue400,
    height: 40,
    paddingHorizontal: spacing.small
  },
  texInputIconContainer: {
    flex: 0.1,
    backgroundColor: colors.blue400,
    height: '100%',
    justifyContent: 'center'
  }
})