import React, { useContext, useEffect, useState, useCallback, useRef } from "react";
import axios from "../../../../utils/axios";
import { UserContext } from "../../../../context/UserContext";
import { NotificationContext } from '../../../../context/NotificationContext';
import { Button, Card, Form, Image, Nav, Tab, Tabs } from "react-bootstrap";
import Pusher from 'pusher-js';
//image
import user1 from "../../../../assets/images/user/01.jpg";
import user2 from "../../../../assets/images/user/02.jpg";
import user3 from "../../../../assets/images/user/03.jpg";
import user4 from "../../../../assets/images/user/04.jpg";
import user5 from "../../../../assets/images/user/11.jpg";
import user6 from "../../../../assets/images/user/12.jpg";
import user7 from "../../../../assets/images/user/13.jpg";
import user8 from "../../../../assets/images/user/14.jpg";
import user9 from "../../../../assets/images/user/15.jpg";
import user10 from "../../../../assets/images/user/16.jpg";

import { getProfileImageUrl } from '../../../../utils/helpers';
import { Link, useNavigate } from "react-router-dom";
import { debounce } from 'lodash';
import moment from 'moment';
import Swal from 'sweetalert2';

const RightSidebar = () => {
  const { userData, setUserData } = useContext(UserContext);

  const [userLists, setUserLists] = useState([]);
  const [conversations, setConversations] = useState([]);
  const [activeChat, setActiveChat] = useState(null);
  const [messages, setMessages] = useState([]);
  const [newMessage, setNewMessage] = useState('');
  const [unreadCount, setUnreadCount] = useState(0);
  const [conversationUnreadCounts, setConversationUnreadCounts] = useState({});
  const [page, setPage] = useState(1);
  const [hasMore, setHasMore] = useState(true);
  const [isLoadingMore, setIsLoadingMore] = useState(false);
  const chatBodyRef = useRef(null);
  const [shouldScrollToBottom, setShouldScrollToBottom] = useState(false);
  const [isMounted, setIsMounted] = useState(false);

  const [searchQuery, setSearchQuery] = useState('');
  const [searchResults, setSearchResults] = useState([]);
  const [isSearching, setIsSearching] = useState(false);

  const { 
    notifications, 
    totalUnread,
    fetchNotifications 
  } = useContext(NotificationContext);

  const [selectedFile, setSelectedFile] = useState(null);
  const [filePreview, setFilePreview] = useState(null);

  // Debounced search function
  const debouncedSearch = useCallback(
    debounce(async (query) => {
      if (!query.trim()) {
        setSearchResults([]);
        setIsSearching(false);
        return;
      }

      try {
        const response = await axios.get(`/api/users/search?query=${encodeURIComponent(query)}`);
        setSearchResults(response.data.slice(0, 5)); // Limit to top 5 results
      } catch (error) {
        console.error('Error searching users:', error);
      } finally {
        setIsSearching(false);
      }
    }, 300),
    []
  );

  // Handle search input change
  const handleSearchChange = (e) => {
    const query = e.target.value;
    setSearchQuery(query);
    setIsSearching(true);
    debouncedSearch(query);
  };

  // Start new conversation with user
  const handleStartConversation = async (user) => {
    try {
      // Create or get existing conversation
      // const response = await axios.post('/api/messages/create-conversation', {
      //   recipient_id: user.id
      // });
      
      // Clear search
      setSearchQuery('');
      setSearchResults([]);
      
      // Open chat with user
      handleChatOpen(user);
      
      // Refresh conversations list
      fetchConversations();
    } catch (error) {
      console.error('Error starting conversation:', error);
    }
  };

  // Fetch conversations
  const fetchConversations = async () => {
    try {
      const response = await axios.get('/api/messages/conversations');
      setConversations(response.data);
    } catch (error) {
      console.error('Error fetching conversations:', error);
    }
  };

  const { userData: user } = useContext(UserContext);
  const { notification: notif } = useContext(NotificationContext);
  useEffect(() => {
    setIsMounted(true);
    return () => setIsMounted(false);
  }, []);

  const messagesEndRef = useRef(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  useEffect(() => {
    if (shouldScrollToBottom) {
      scrollToBottom();
      setShouldScrollToBottom(false);
    }
  }, [shouldScrollToBottom]);

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  const fetchData = async () => {
    try {
      const [users, convos, unread] = await Promise.all([
        axios.get('/api/users'),
        axios.get('/api/messages/conversations'),
        axios.get('/api/messages/unread-count')
      ]);

      if (isMounted) {
        setUserLists(users.data);
        setConversations(convos.data);
        setUnreadCount(unread.data.total_count);
        setConversationUnreadCounts(unread.data.conversation_counts || {});
      }
    } catch (error) {
      console.error('Error fetching data:', error);
    }
  };

  // Initial data load and cleanup
  useEffect(() => {
    if (user) {
      fetchData();
    }
  }, [user]);

  // Listen for new notifications
  useEffect(() => {
    if (notif) {
      fetchData();
    }
  }, [notif]);

  const handleChatClose = () => {
    setActiveChat(null);
    setMessages([]);
    setPage(1);
    setHasMore(true);
    const modal = document.getElementById('chat-popup-modal');
    if (modal) {
      modal.classList.remove('show');
    }
  };

  const fetchMessages = async (pageNum = 1, append = false) => {
    if (!activeChat || !isMounted) return;

    try {
      setIsLoadingMore(pageNum > 1);
      const response = await axios.get(`/api/messages/${activeChat.id}?page=${pageNum}`);
      

      if (!isMounted) return;

      const newMessages = Array.isArray(response.data.messages) 
        ? response.data.messages 
        : Object.values(response.data.messages);

      if (append) {
        // Store current scroll position
        const chatList = chatBodyRef.current;
        const oldScrollHeight = chatList.scrollHeight;
        const oldScrollTop = chatList.scrollTop;

        setMessages(prev => [...newMessages, ...prev]);

        // After state update, restore scroll position
        setTimeout(() => {
          if (chatList) {
            const newScrollHeight = chatList.scrollHeight;
            const scrollDiff = newScrollHeight - oldScrollHeight;
            chatList.scrollTop = oldScrollTop + scrollDiff;
          }
        }, 0);
      }
      else {
        setMessages(newMessages);
        setShouldScrollToBottom(true);
      }
      setHasMore(response.data.has_more);

      if (pageNum === 1) {
        const modal = document.getElementById('chat-popup-modal');
        if (modal) {
          fetchNotifications();
          modal.classList.add('show');
          setShouldScrollToBottom(true);
        }
      }
    } catch (error) {
      console.error('Error fetching messages:', error);
    } finally {
      setIsLoadingMore(false);
    }
  };

  // Initial load of messages when chat opens
  useEffect(() => {
    if (activeChat) {
      setPage(1);
      setHasMore(true);
      setMessages([]);
      fetchMessages(1, false);
    }
  }, [activeChat]);

  const handleScroll = useCallback((e) => {
    const { scrollTop, scrollHeight, clientHeight } = e.target;
    
    // Calculate scroll percentage from top
    const scrollPercentage = (scrollTop / (scrollHeight - clientHeight)) * 100;
    
    // Load more when scrolled up to about 20% from top (approximately 8 messages)
    if (scrollPercentage < 20 && hasMore && !isLoadingMore) {
      const nextPage = page + 1;
      setPage(nextPage);
      fetchMessages(nextPage, true);
    }

    // Update auto-scroll flag based on scroll position
    const isAtBottom = Math.abs(scrollHeight - clientHeight - scrollTop) < 50;
    setShouldScrollToBottom(isAtBottom);
  }, [page, hasMore, isLoadingMore]);

  const handleChatOpen = async (conversation) => {
    setActiveChat(conversation);
    
    // Mark messages as read when opening chat
    try {
      await axios.post(`/api/messages/mark-read/${conversation.id}`);
      // Update unread counts after marking as read
      const unread = await axios.get('/api/messages/unread-count');
      setUnreadCount(unread.data.total_count);
      setConversationUnreadCounts(unread.data.conversation_counts || {});
    } catch (error) {

      console.error('Error marking messages as read:', error);
    }
  };

  const handleSendMessage = async (e) => {
    e.preventDefault(); // Prevent form submission from reloading the page
    if (!newMessage.trim() && !selectedFile) return;

    // Create form data for file upload
    const formData = new FormData();
    formData.append('recipient_id', activeChat.id);
    
    if (selectedFile) {
      formData.append('file', selectedFile);
      formData.append('type', getFileType(selectedFile.type));
    } else {
      formData.append('message', newMessage.trim());
      formData.append('type', 'text');
    }

    // Create pending message
    const pendingMessage = {
      id: Date.now(),
      status: 'sending',
      content: selectedFile ? selectedFile.name : newMessage.trim(),
      sender_id: userData.id,
      created_at: new Date().toISOString(),
      type: selectedFile ? getFileType(selectedFile.type) : 'text',
      file: selectedFile
    };

    // Clear input immediately for better UX
    setNewMessage('');
    setSelectedFile(null);
    setFilePreview(null);  // Clear the preview
    
    // Add message to state immediately with pending status
    setMessages(prev => [...prev, pendingMessage]);

    try {
      const response = await axios.post('/api/messages/send', formData, {
        headers: {
          'Content-Type': 'multipart/form-data',
        }
      });

      // Update the message status to sent
      setMessages(prev => prev.map(msg => 
        msg.id === pendingMessage.id 
          ? { ...response.data, status: response.data.is_read ? 'read' : 'sent' }
          : msg
      ));
      setShouldScrollToBottom(true);
    } catch (error) {
      // Update the message status to error
      setMessages(prev => prev.map(msg => 
        msg.id === pendingMessage.id 
          ? { ...msg, status: 'error' }
          : msg
      ));
      setSelectedFile(null);
      setFilePreview(null);  // Clear preview even if there's an error
    }
  };

  const getFileType = (mimeType) => {
    if (mimeType.startsWith('image/')) return 'image';
    if (mimeType.startsWith('video/')) return 'video';
    return 'file';
  };

  const handleFileSelect = (e) => {
    const file = e.target.files[0];
    if (file) {
      if (file.size > 50 * 1024 * 1024) { // 50MB limit
        Swal.fire({
          icon: 'error',
          title: 'File too large',
          text: 'Please select a file smaller than 50MB'
        });
        return;
      }
      setSelectedFile(file);
      
      // Create preview
      if (file.type.startsWith('image/')) {
        const reader = new FileReader();
        reader.onloadend = () => {
          setFilePreview({
            type: 'image',
            url: reader.result,
            name: file.name
          });
        };
        reader.readAsDataURL(file);
      } else if (file.type.startsWith('video/')) {
        const reader = new FileReader();
        reader.onloadend = () => {
          setFilePreview({
            type: 'video',
            url: reader.result,
            name: file.name
          });
        };
        reader.readAsDataURL(file);
      } else {
        setFilePreview({
          type: 'file',
          name: file.name,
          size: (file.size / 1024).toFixed(2) + ' KB'
        });
      }
    }
  };

  const cancelFileSelection = () => {
    setSelectedFile(null);
    setFilePreview(null);
  };

  const downloadFile = async (message) => {
    try {
      const response = await axios.get(`/api/messages/download/${message.id}`, {
        responseType: 'blob'
      });
      
      const url = window.URL.createObjectURL(new Blob([response.data]));
      const link = document.createElement('a');
      link.href = url;
      link.setAttribute('download', message.file_name);
      document.body.appendChild(link);
      link.click();
      link.remove();
    } catch (error) {
      Swal.fire({
        icon: 'error',
        title: 'Download failed',
        text: 'Failed to download the file'
      });
    }
  };

  // Message content renderer based on type
  const MessageContent = ({ message }) => {
    switch (message.type) {
      case 'image':
        return (
          <div className="message-image">
            <img 
              src={message.file_url} 
              alt={message.content}
              className="img-fluid rounded"
              style={{ maxWidth: '200px', cursor: 'pointer' }}
              onClick={() => downloadFile(message)}
            />
          </div>
        );
      case 'video':
        return (
          <div className="message-video">
            <video 
              controls 
              src={message.file_url}
              className="img-fluid rounded"
              style={{ maxWidth: '200px' }}
            >
              Your browser does not support the video tag.
            </video>
          </div>
        );
      case 'file':
        return (
          <div 
            className="message-file d-flex align-items-center"
            style={{ cursor: 'pointer' }}
            onClick={() => downloadFile(message)}
          >
            <span className="material-symbols-outlined me-2">description</span>
            <span>{message.content}</span>
          </div>
        );
      default:
        return message.content;
    }
  };

  // Message status renderer
  const MessageStatus = ({ status }) => {
    if (status === 'sending') {
      return (
        <div className="message-status d-inline-block ms-1">
          <div className="spinner-border spinner-border-sm text-secondary" style={{ width: '0.7rem', height: '0.7rem' }} role="status">
            <span className="visually-hidden">Sending...</span>
          </div>
        </div>
      );
    } else if (status === 'error') {
      return (
        <span className="message-status text-danger ms-1" title="Failed to send">
          <i className="material-symbols-outlined" style={{ fontSize: '14px' }}>error</i>
        </span>
      );
    } else if (status === 'sent') {
      return (
        <span className="message-status text-secondary ms-1">
          <i className="material-symbols-outlined" style={{ fontSize: '14px' }}>check</i>
        </span>
      );
    } else if (status === 'read') {
      return (
        <span className="message-status text-primary ms-1">
          <i className="material-symbols-outlined" style={{ fontSize: '14px' }}>done_all</i>
        </span>
      );
    }
    return null;
  };

  // Listen for new messages with Pusher
  useEffect(() => {
    if (!userData?.id) return;

    const pusher = new Pusher(process.env.REACT_APP_PUSHER_KEY, {
      cluster: process.env.REACT_APP_PUSHER_CLUSTER,
    });

    const channel = pusher.subscribe(`chat.${userData.id}`);
    channel.bind('new-message', async (data) => {
      if (data.message.sender_id === activeChat?.id) {
        setMessages(prev => [...prev, data.message]);
        setShouldScrollToBottom(true);
      }
      fetchConversations();
    });

    return () => {
      channel.unbind_all();
      channel.unsubscribe();
    };
  }, [userData, activeChat]);

  const minirightsidebar = () => {
    document.getElementById("rightSidebar").classList.toggle("right-sidebar");
    document.body.classList.toggle("right-sidebar-close");
  };

  const history = useNavigate();

  useEffect(() => {
    let clickableElements = document.querySelectorAll(
      '[data-target="chat-popup-modal"]'
    );

    clickableElements.forEach(function (clickableElement) {
      clickableElement.addEventListener("click", function () {
        let targetId = clickableElement.getAttribute("data-target");
        let targetElement = document.getElementById(targetId);
        if (targetElement) {
          targetElement.classList.add("show");
        }
      });
    });

    let closeBtn = document.querySelector(".chat-popup-modal-close");

    if (closeBtn) {
      closeBtn.addEventListener("click", function () {
        let chatModal = document.getElementById("chat-popup-modal");
        if (chatModal.classList.contains("show")) {
          chatModal.classList.remove("show");
        }
      });
    }
  });

  return (
    <>
      <div className="right-sidebar-mini" id="rightSidebar">
        <div className="right-sidebar-panel p-0">
          <Card className="shadow-none m-0 h-100">
            <Card.Body className="px-0 pt-0">
              <div className="p-4">
                <h6 className="fw-semibold m-0">Chats</h6>
                <div className="mt-4 iq-search-bar device-search ">
                  <Form action="#" className="searchbox position-relative">
                    <Link className="search-link" to="#">
                      <svg
                        width="16"
                        height="17"
                        viewBox="0 0 24 24"
                        fill="none"
                        xmlns="http://www.w3.org/2000/svg"
                      >
                        <circle
                          cx="7.82491"
                          cy="7.82495"
                          r="6.74142"
                          stroke="currentColor"
                          strokeWidth="1.5"
                          strokeLinecap="round"
                          strokeLinejoin="round"
                        />
                        <path
                          d="M12.5137 12.8638L15.1567 15.5"
                          stroke="currentColor"
                          strokeWidth="1.5"
                          strokeLinecap="round"
                          strokeLinejoin="round"
                        />
                      </svg>
                    </Link>
                    <Form.Control
                      type="text"
                      className="text search-input bg-light-subtle"
                      placeholder="Search for people or groups..."
                      value={searchQuery}
                      onChange={handleSearchChange}
                    />
                    {/* Search Results Dropdown */}
                    {(searchResults.length > 0 || isSearching) && (
                      <div className="search-results-dropdown position-absolute w-100 bg-white shadow-sm rounded-2 mt-1 p-2" style={{ zIndex: 1000 }}>
                        {isSearching ? (
                          <div className="text-center p-2">
                            <span className="spinner-border spinner-border-sm me-2" role="status" aria-hidden="true"></span>
                            Searching...
                          </div>
                        ) : (
                          searchResults.map((user, index) => (
                            <div
                              key={index}
                              className="d-flex align-items-center p-2 cursor-pointer hover-bg-light rounded"
                              onClick={() => handleStartConversation(user)}
                              style={{ cursor: 'pointer' }}
                            >
                              <div className="iq-profile-avatar status-online me-3">
                                <img
                                  className="rounded-circle avatar-40"
                                  src={getProfileImageUrl(user)}
                                  alt={user?.name}
                                  loading="lazy"
                                />
                              </div>
                              <div>
                                <h6 className="mb-0 font-size-14">{user?.name}</h6>
                                <p className="mb-0 font-size-12 text-muted">
                                  {user.email}
                                </p>
                              </div>
                            </div>
                          ))
                        )}
                      </div>
                    )}
                  </Form>
                </div>
              </div>
              <Tab.Container defaultActiveKey="first">
                <Nav
                  className="nav-tabs right-sidebar-tabs"
                  id="right-sidebar-tabs"
                  role="tablist"
                >
                  <Nav.Link
                    eventKey={"first"}
                    className="text-center"
                    id="nav-friends-tab"
                    data-bs-toggle="tab"
                    data-bs-target="#nav-friends"
                    type="button"
                    role="tab"
                    aria-controls="nav-friends"
                    aria-selected="true"
                  >
                    <span className="text-body icon">
                    <svg
                        xmlns="http://www.w3.org/2000/svg"
                        width="18"
                        height="18"
                        viewBox="0 0 24 24"
                        fill="none"
                        stroke="currentColor"
                        strokeWidth="1.5"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                      >
                        <path d="M21 11.5a8.38 8.38 0 0 1-.9 3.8 8.5 8.5 0 0 1-7.6 4.7 8.38 8.38 0 0 1-3.8-.9L3 21l1.9-5.7a8.38 8.38 0 0 1-.9-3.8 8.5 8.5 0 0 1 4.7-7.6 8.38 8.38 0 0 1 3.8-.9h.5a8.48 8.48 0 0 1 8 8v.5z" />
                      </svg>
                    </span>{" "}
                    <span className="h6 font-size-14">Chats</span>
                  </Nav.Link>
                  <Nav.Link
                    eventKey={"second"}
                    className="text-center"
                    id="nav-groups-tab"
                    data-bs-toggle="tab"
                    data-bs-target="#nav-groups"
                    type="button"
                    role="tab"
                    aria-controls="nav-groups"
                    aria-selected="false"
                  >
                    <span className="text-body icon">
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        width="18"
                        height="18"
                        viewBox="0 0 18 18"
                        fill="none"
                      >
                        <path
                          d="M0.75 15V12.9C0.75 12.475 0.859375 12.0844 1.07812 11.7281C1.29688 11.3719 1.5875 11.1 1.95 10.9125C2.725 10.525 3.5125 10.2344 4.3125 10.0406C5.1125 9.84688 5.925 9.75 6.75 9.75C7.575 9.75 8.3875 9.84688 9.1875 10.0406C9.9875 10.2344 10.775 10.525 11.55 10.9125C11.9125 11.1 12.2031 11.3719 12.4219 11.7281C12.6406 12.0844 12.75 12.475 12.75 12.9V15H0.75ZM14.25 15V12.75C14.25 12.2 14.0969 11.6719 13.7906 11.1656C13.4844 10.6594 13.05 10.225 12.4875 9.8625C13.125 9.9375 13.725 10.0656 14.2875 10.2469C14.85 10.4281 15.375 10.65 15.8625 10.9125C16.3125 11.1625 16.6563 11.4406 16.8938 11.7469C17.1313 12.0531 17.25 12.3875 17.25 12.75V15H14.25ZM6.75 9C5.925 9 5.21875 8.70625 4.63125 8.11875C4.04375 7.53125 3.75 6.825 3.75 6C3.75 5.175 4.04375 4.46875 4.63125 3.88125C5.21875 3.29375 5.925 3 6.75 3C7.575 3 8.28125 3.29375 8.86875 3.88125C9.45625 4.46875 9.75 5.175 9.75 6C9.75 6.4125 9.45625 6.76563 8.86875 7.05938C8.28125 7.35313 7.575 7.5 6.75 7.5Z"
                          fill="currentColor"
                        />
                      </svg>
                    </span>{" "}
                    <span className="h6 font-size-14">Users</span>
                  </Nav.Link>
                </Nav>
                <div className="media-height" data-scrollbar="init">
                  <Tab.Content className="right-sidebar-tabs-content">
                    <Tab.Pane eventKey="first">
                      {conversations.map((conversation, index) => (
                        <div
                          key={index}
                          className="d-flex align-items-center justify-content-between chat-tabs-content border-bottom"
                          onClick={() => handleChatOpen(conversation)}
                        >
                          <div className="d-flex align-items-center gap-3">
                            <div className="iq-profile-avatar status-online">
                              <img
                                className="rounded-circle avatar-50"
                                src={getProfileImageUrl(conversation)}
                                alt="user-img"
                                loading="lazy"
                              />
                            </div>
                            <div>
                              <h6 className="font-size-14 mb-0 fw-semibold">
                                {conversation.user?.name}
                              </h6>
                              <p className="mb-0 font-size-12 fw-medium">
                                {conversation.last_message || 'Start a conversation'}
                              </p>
                            </div>
                          </div>
                          <span className="font-size-12 fw-medium">
                            {moment(conversation.last_message_time).fromNow()}
                            {conversationUnreadCounts[conversation.conversation_id] > 0 && (
                              <span className="badge bg-danger rounded-pill ms-2">
                                {conversationUnreadCounts[conversation.conversation_id]}
                              </span>
                            )}
                          </span>
                        </div>
                      ))}
                    </Tab.Pane>
                    <Tab.Pane eventKey={"second"}>
                    {userLists?.users?.map((user, index) => (
                            <div
                            className="d-flex align-items-center justify-content-between chat-tabs-content border-bottom"
                            data-target="chat-popup-modal"
                            key={index}
                            onClick={() => handleStartConversation(user)}
                          >
                            <div className="d-flex align-items-center gap-3">
                              <div className="flex-shrink-0">
                                <img
                                  className="rounded-circle avatar-50"
                                  src={getProfileImageUrl(user)}
                                  alt={user?.name}
                                  loading="lazy"
                                />
                              </div>
                              <div>
                                <h6 className="font-size-14 mb-0 fw-semibold">
                                  {user?.name}
                                </h6>
                                <p className="mb-0 font-size-12 fw-medium">
                                  Start a new conversation?
                                </p>
                              </div>
                            </div>
                            <span className="font-size-12 fw-medium">Now</span>
                          </div>
                          ))}
                      
                    </Tab.Pane>
                  </Tab.Content>
                </div>
              </Tab.Container>
              <div
                className="right-sidebar-toggle bg-primary text-white mt-3 d-none position-relative"
                onClick={minirightsidebar}
              >
                <span className="material-symbols-outlined">chat</span>
                {unreadCount > 0 && (
                  <span className="position-absolute top-0 start-100 translate-middle badge rounded-pill bg-danger">
                    {unreadCount}
                    <span className="visually-hidden">unread messages</span>
                  </span>
                )}
              </div>
              <div className="conversion-button">
                <Button
                  onClick={() => history('/chat/index')}
                  as="a"
                  className="btn btn-primary w-100 py-3 d-block rounded-0"
                >
                  View All Conversion
                </Button>
              </div>
              <div className="mt-30-imp right-sidebar-toggle bg-primary text-white mt-3 d-flex" style={{ marginTop: "30px !important" }} onClick={minirightsidebar}>
                <span className="material-symbols-outlined">chat</span>
                {unreadCount > 0 && (
                  <span className="position-absolute top-0 start-100 translate-middle badge rounded-pill bg-danger">
                    {unreadCount}
                    <span className="visually-hidden">unread messages</span>
                  </span>
                )}
              </div>
            </Card.Body>
          </Card>
        </div>
      </div>

      <div className="chat-popup-modal" id="chat-popup-modal">
        {activeChat && (
          <>
            <div className="bg-primary p-3 d-flex align-items-center justify-content-between gap-3">
              <div className="d-flex align-items-center gap-3">
                <div className="image flex-shrink-0">
                  <img
                    src={getProfileImageUrl(activeChat)}
                    alt="img"
                    className="img-fluid avatar-45 rounded-circle object-cover"
                  />
                </div>
                <div className="content">
                  <h6 className="mb-0 font-size-14 text-white">{activeChat?.name}</h6>
                  <span className="d-inline-block lh-1 font-size-12 text-white">
                    <span className="d-inline-block rounded-circle bg-success border-5 p-1 align-baseline me-1"></span>
                    {activeChat.status || 'Available'}
                  </span>
                </div>
              </div>
              <div className="chat-popup-modal-close lh-1" type="button" onClick={handleChatClose}>
                <span className="material-symbols-outlined font-size-18 text-white">
                  close
                </span>
              </div>
            </div>
            <div 
              className="chat-popup-body p-3 border-bottom"
            >
              {isLoadingMore && (
                <div className="text-center mb-2">
                  <div className="spinner-border spinner-border-sm text-primary" role="status">
                    <span className="visually-hidden">Loading...</span>
                  </div>
                </div>
              )}
              <ul 
                className="list-inline p-0 mb-0 chat"
                ref={chatBodyRef}
                onScroll={handleScroll}
                style={{ maxHeight: '400px', overflowY: 'auto' }}
              >
                <li>
                  <div className="text-center">
                    <span className="time font-size-12 text-primary">Today</span>
                  </div>
                </li>
                {messages.map((message, index) => (
                  <li key={index} className={`mt-${index === 0 ? '2' : '3'}`}>
                    <div className={`text-${message.sender_id == userData?.id ? 'end' : 'start'}`}>
                      <div className={`d-inline-block py-2 px-3 ${message.sender_id == userData?.id ? 'bg-primary-subtle message-right' : 'bg-gray-subtle'} chat-popup-message font-size-12 fw-medium`}>
                        <MessageContent message={message} />
                      </div>
                      {message.sender_id == userData?.id ? (

                      <p className="mb-0 d-flex align-items-center " style={{ justifyContent: 'flex-end' }}>
                        {message.sender_id === userData.id && (
                          <MessageStatus status={message.status || (message.is_read ? 'read' : 'sent')} />
                        )}
                        <span className="mt-1 d-block time font-size-10 fst-italic">
                          {moment(message.created_at).fromNow()}
                        </span>
                      </p>
                      ):
                      (<p className="mb-0 d-flex align-items-center">
                        {message.sender_id === userData.id && (
                          <MessageStatus status={message.status || (message.is_read ? 'read' : 'sent')} />
                        )}
                        <span className="mt-1 d-block time font-size-10 fst-italic">
                          {moment(message.created_at).fromNow()}
                        </span>
                      </p>)}
                    </div>
                  </li>
                ))}
                <div ref={messagesEndRef} />
              </ul>
            </div>
            <div className="chat-popup-footer p-3">
              <div className="chat-popup-form">
                <form onSubmit={handleSendMessage} className="chat-form" style={{display:'flex', flexDirection: 'column'}}>
                  {filePreview && (
                    <div className="file-preview mb-2 p-2 bg-light rounded">
                      <div className="d-flex align-items-center justify-content-between">
                        <div className="d-flex align-items-center">
                          {filePreview.type === 'image' && (
                            <img 
                              src={filePreview.url} 
                              alt={filePreview.name}
                              className="me-2"
                              style={{ maxHeight: '50px', maxWidth: '50px', objectFit: 'cover' }}
                            />
                          )}
                          {filePreview.type === 'video' && (
                            <video 
                              src={filePreview.url}
                              className="me-2"
                              style={{ maxHeight: '50px', maxWidth: '50px', objectFit: 'cover' }}
                            />
                          )}
                          {filePreview.type === 'file' && (
                            <span className="material-symbols-outlined me-2">description</span>
                          )}
                          <div>
                            <div className="small fw-medium text-truncate" style={{ maxWidth: '200px' }}>
                              {filePreview.name}
                            </div>
                            {filePreview.type === 'file' && (
                              <div className="small text-muted">{filePreview.size}</div>
                            )}
                          </div>
                        </div>
                        <button 
                          type="button" 
                          className="btn btn-link text-danger p-0 ms-2"
                          onClick={cancelFileSelection}
                        >
                          <span className="material-symbols-outlined">close</span>
                        </button>
                      </div>
                    </div>
                  )}
                  <div className="d-flex">
                    <input
                      type="text"
                      className="form-control"
                      placeholder={selectedFile ? 'Add a caption...' : 'Type your message'}
                      value={newMessage}
                      onChange={(e) => setNewMessage(e.target.value)}
                    />
                    <input
                      type="file"
                      id="file-upload"
                      className="d-none"
                      onChange={handleFileSelect}
                      accept="image/*,video/*,.pdf,.doc,.docx,.xls,.xlsx,.txt"
                    />
                    <button 
                      type="button"
                      className="btn btn-link"
                      onClick={() => document.getElementById('file-upload').click()}
                    >
                      <span className="material-symbols-outlined">attach_file</span>
                    </button>
                    <button type="submit" className="btn btn-primary d-flex align-items-center">
                      <span className="material-symbols-outlined">send</span>
                    </button>
                  </div>
                </form>
              </div>
            </div>
          </>
        )}
      </div>
    </>
  );
};

export default RightSidebar;
