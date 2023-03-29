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

  const [roomName, setRoomName] = useState('');
  const [currentRoomId, setCurrentRoomId] = useState('');
  const [messages, setMessages] = useState<ChatDto.Message[] | []>([]);
  const [textMessage, setTextMessage] = useState('');
  const [extraMarginBottom, setExtraMarginBottom] = useState(false)
 
  const route = useRoute<RouteProp<TNavParams, 'Chat'>>();
  const scrollRef = useRef<ScrollView>(null);
  const socketRef = useRef<any>(null);
  const { bottom } = useSafeAreaInsets();

  const keyboardHeight = useKeyboardHeight();
 
  const { adId, authorId, userId, roomId} = route.params;

  const checkRoomMembersAndGetMessages = useCallback( async() => {
    if(roomId){
      const data = await checkOrCreateRoom(adId, authorId, userId, roomId);
      setCurrentRoomId(data.roomId)
      setRoomName(`${data.authorId}--with--${data.userId}`);
    } else {
      const data = await checkOrCreateRoom(adId, authorId, userId);
      setCurrentRoomId(data.roomId)
      setRoomName(`${data.authorId}--with--${data.userId}`);
    }
  }, [setRoomName, adId, authorId, userId, roomId]);

  const getData = useCallback( async() => {
    const data = await getMessages(currentRoomId as string);
      setMessages(data);
  }, [setMessages, currentRoomId]);

  useEffect(()=> {
    socketRef.current = io(Config.DOMAIN_URL);
    socketRef.current.connect();
    return () => socketRef.current.disconnect();
  }, []);
  
  useEffect(()=>{
      socketRef.current.on("onMessage", (message: ChatDto.Message) => {
      setMessages(prevState => [...prevState, message]);
      scrollRef.current?.scrollToEnd()
    });
    checkRoomMembersAndGetMessages();
  }, [checkRoomMembersAndGetMessages, socketRef, setMessages]);

  useEffect(() => {
    if(roomName !== ''){
      socketRef.current.emit('join', roomName);
      getData();
    }
  }, [roomName, getData])

  const sendMessage = async () => {
    if(textMessage !== ''){
      const res = await postMessage(textMessage, currentRoomId as string, userId);
      if(res.status === 200){
        const { message } = res.data;
        const data = {
          id: message.id,
          text: message.text,
          user_id: message.user_id,
          createdAt: message.createdAt
      };
        socketRef.current.emit('emitMessage', data);
        setMessages(prevState => [...prevState, data]);
        setTextMessage('');
        Keyboard.dismiss();
      }
      
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