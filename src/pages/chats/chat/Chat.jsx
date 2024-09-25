import Box from '@mui/material/Box';
import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import MoreHorizIcon from '@mui/icons-material/MoreHoriz';
import Tooltip from '@mui/material/Tooltip';
import IconButton from '@mui/material/IconButton';
import AttachFileIcon from '@mui/icons-material/AttachFile';
import AddReactionIcon from '@mui/icons-material/AddReaction';
import SendIcon from '@mui/icons-material/Send';
import Chip from '@mui/material/Chip';
import Avatar from '@mui/material/Avatar';
import Button from '@mui/material/Button';
import Divider from '@mui/material/Divider';
import AvatarGroup from '@mui/material/AvatarGroup';
import Typography from '@mui/material/Typography';
import { socket } from '~/Socket';
import { useEffect, useRef, useState } from 'react';
import { getRoomChatMessages } from '~/api/roomChatAPI';
import { sendMessage } from '~/api/messagesAPI';
import { useSelector } from 'react-redux';
import { toast } from 'react-toastify';
import dayjs from 'dayjs';
import { useParams, useNavigate } from 'react-router-dom';
import LoadingArea from '~/components/LoadingArea';
import MenuChatRoom from '~/components/Menu/MenuChatRoom';

const Chat = () => {
  const [open, setOpen] = useState(false)
  const navigate = useNavigate();
  const { id } = useParams();
  let roomId = id;
  const messagesEndRef = useRef(null);
  const profile = useSelector((state) => state.userData);
  const [chat, setChat] = useState('');
  const [loading, setLoading] = useState(false);
  const [typing, setTyping] = useState([]);
  const [roomchat, setRoomchat] = useState({
    members: [],
    messages: [],
  });

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [roomchat.messages]);

  const fetchMessages = async () => {
    roomId = id;
    setLoading(true);
    const response = await getRoomChatMessages(roomId, profile._id);
    if (response?.redirect) navigate(`/chats/${response.redirect}`);
    if (!response?.messages?.error) {
      response.messages = response?.messages?.map((data) => {
        data.sender = data.sender[0];
        data.createdAt = dayjs(data.createdAt).format('MM/DD-HH:mm');
        return data;
      });
    }

    setRoomchat(response);
    setLoading(false);
  };

  useEffect(() => {
    fetchMessages();
    if (!roomchat?.messages?.error) {
      socket.emit('join_room', roomId);
      return () => {
        socket.emit('leave_room', roomId);
      };
    }
  }, [id]);

  const handleReceiveMessage = (data) => {
    setRoomchat((prevMessages) => ({
      ...prevMessages,
      messages: [...prevMessages.messages, data],
    }));
  };

  useEffect(() => {
    if (!roomchat.messages.error) {
      socket.on('receive_message', handleReceiveMessage);
      socket.on('typing', (data) => {
        setTyping(data);
      });
      return () => {
        socket.off('receive_message', handleReceiveMessage);
        socket.off('typing');
      };
    }
  }, []);

  const handleUnTyping = () => {
    socket.emit('untyping', {
      room: roomId,
      username: profile.username,
      profile_picture: profile.profile_picture,
    });
  };

  const handleTyping = () => {
    socket.emit('typing', {
      room: roomId,
      username: profile.username,
      profile_picture: profile.profile_picture,
    });
  };

  const handleSendChat = async () => {
    if (roomchat.messages.error) {
      return toast.error(roomchat.messages.error);
    }
    if (chat.trim()) {
      const time = new Date().toLocaleTimeString();
      socket.emit('receive_message', {
        room: roomId,
        message: chat,
        createdAt: time,
        sender: {
          _id: profile._id,
          name: profile.name,
          profile_picture: profile.profile_picture,
        },
      });
      try {
        await sendMessage(profile._id, roomId, chat);
      } catch (error) {
        toast.error('Error sending message.');
      }
      setChat('');
    }
  };

  return (
    <>
      {
        <MenuChatRoom roomChatAction={roomchat} setOpen={setOpen} open={open} />
      }
      <Box sx={{ display: 'flex', flexDirection: 'column', height: '100vh', padding: '10px' }}>
        <Box
          sx={{
            display: 'flex',
            justifyContent: 'space-between',
            alignItems: 'center',
            height: '60px',
            padding: '10px',
          }}
        >
          <Box
            sx={{
              display: 'flex',
              justifyContent: 'start',
              alignItems: 'center',
              gap: 1,
              backgroundColor: 'background.primary',
            }}
          >
            <Tooltip title="Back">
              <IconButton onClick={() => navigate('/roomchats')} sx={{ color: 'error.main' }}>
                <ArrowBackIcon />
              </IconButton>
            </Tooltip>
            <Button
              startIcon={
                <Avatar
                  src={roomchat?.avatarRoom}
                  sx={{ cursor: 'pointer', width: '40px', height: '40px' }}
                />
              }
            >
              <Typography variant="body1">{roomchat?.room_name}</Typography>
            </Button>
          </Box>
          <Tooltip title="More">
            <IconButton onClick={() => setOpen(true)}>
              <MoreHorizIcon sx={{ color: 'text.primary' }} />
            </IconButton>
          </Tooltip>
        </Box>
        <Divider />
        <Box sx={{ overflowY: 'auto', overflowX: 'hidden', height: '100%' }}>
          {loading && <LoadingArea />}
          {roomchat?.messages?.error ? (
            <Divider sx={{ margin: 1 }}>
              <Typography sx={{ color: 'red' }}>{roomchat.messages.error}</Typography>
            </Divider>
          ) : (
            roomchat?.messages?.map((data, index) => (
              <Box
                key={index}
                sx={{
                  display: 'flex',
                  justifyContent:
                    data.sender._id === profile._id ? 'row-reverse' : 'row',
                  alignItems: 'start',
                  maxWidth: '100%',
                  flexDirection: data.sender._id === profile._id ? 'row-reverse' : 'row',
                  gap: 1,
                  padding: '5px',
                  ':hover .time': { opacity: 1, visibility: 'visible' },
                }}
              >
                {data.sender._id !== profile._id && (
                  <Avatar
                    src={data.sender.profile_picture}
                    sx={{ width: '36px', height: '36px' }}
                  />
                )}
                <Typography
                  variant="body1"
                  sx={{
                    wordBreak: 'break-word',
                    lineHeight: '1.5',
                    letterSpacing: '0.6px',
                    backgroundColor:
                      data.sender._id === profile._id ? 'secondary.main' : '#F0F2F5',
                    color:
                      data.sender._id === profile._id ? 'background.primary' : 'text.primary',
                    borderRadius: 6,
                    padding: '10px 15px',
                    fontSize: '15px',
                    fontweight: '50',
                  }}
                >
                  {data.message}
                </Typography>
                {data.userId !== profile._id && <Chip label={data.name} color="primary" />}
                <Typography
                  variant="caption"
                  className="time"
                  sx={{
                    opacity: 0,
                    transition: 'opacity 0.3s',
                    visibility: 'hidden',
                    whiteSpace: 'nowrap',
                    color: 'text.secondary',
                  }}
                >
                  {data.createdAt}
                </Typography>
              </Box>
            ))
          )}
          {typing.length > 0 && (
            <Box
              sx={{
                display: 'flex',
                justifyContent: 'start',
                width: '100%',
                alignItems: 'center',
                gap: 1,
                marginBottom: 1,
              }}
            >
              <AvatarGroup max={4}>
                {typing.map((data, index) => (
                  <Avatar
                    key={index}
                    src={data.profile_picture}
                    sx={{ width: '35px', height: '35px' }}
                  />
                ))}
              </AvatarGroup>
              <Chip
                label={
                  typing.length === 1
                    ? `${typing[0].username === profile.username
                      ? 'you'
                      : typing[0].username
                    } is typing...`
                    : 'Several people are typing...'
                }
                color="info"
              />
            </Box>
          )}
          <div ref={messagesEndRef} />
        </Box>
        <Divider />
        <Box sx={{ padding: '10px' }}>
          <Box
            sx={{
              backgroundColor: 'background.primary',
              height: '45px',
              width: '100%',
              border: '1px solid green',
              borderRadius: '100rem',
              display: 'flex',
              alignItems: 'center',
              gap: 1,
            }}
          >
            <Box sx={{ display: 'flex' }}>
              <Tooltip title="Add reaction">
                <IconButton color="error">
                  <AddReactionIcon />
                </IconButton>
              </Tooltip>
              <Tooltip title="Attach file">
                <IconButton color="warning" component="label">
                  <AttachFileIcon />
                  <input type="file" style={{ display: 'none' }} />
                </IconButton>
              </Tooltip>
            </Box>
            <input
              onBlur={() => handleUnTyping()}
              onFocus={() => handleTyping()}
              onChange={(e) => setChat(e.target.value)}
              value={chat}
              autoFocus
              placeholder="Write a comment..."
              style={{
                backgroundColor: 'transparent',
                border: 'none',
                width: '100%',
                height: '100%',
                outline: 'none',
                fontSize: '1rem',
              }}
            />
            <Tooltip title="Send">
              <IconButton color="info" onClick={handleSendChat}>
                <SendIcon />
              </IconButton>
            </Tooltip>
          </Box>
        </Box>
      </Box >
    </>
  );
};

export default Chat;
