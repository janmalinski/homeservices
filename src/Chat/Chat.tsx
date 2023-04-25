import { StyleSheet, Text, View } from 'react-native';
import React from 'react';

import { ChatDto } from './chat.dto';
import { colors } from '@src/components/designSystem/colors';
import { spacing } from '@src/components/designSystem/spacing';

interface IProps {
    messages: ChatDto.Message[];
    userId: string;
}

const Chat = ({messages, userId} : IProps) => (
    messages.map(message => (
        <View key={message.id} style={styles.content}> 
          <Text style={[styles.messageText, message.user_id === userId ? {backgroundColor: colors.primary, alignSelf: 'flex-end'} : {backgroundColor: colors.secondary }]}>{message.text}</Text>
        </View>
)));


export default Chat;

const styles = StyleSheet.create({
    content: {
        flex:1,
        justifyContent: 'space-between',
        paddingBottom: spacing.xLarge,
        paddingHorizontal: spacing.large,
        backgroundColor: colors.white
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
})