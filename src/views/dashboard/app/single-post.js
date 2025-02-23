import React, { useContext, useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import axios from "../../../utils/axios";
import { UserContext } from "../../../context/UserContext";
import { Row, Col, Container } from "react-bootstrap";
import Post from "../../../components/Post";
import loader from "../../../assets/images/page-img/page-load-loader.gif";

const SinglePost = () => {
  const { id } = useParams(); // Get post ID from URL
  const [post, setPost] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchPost = async () => {
      try {
        const response = await axios.get(`/api/posts/${id}`);
        setPost(response.data);
        setLoading(false);
      } catch (error) {
        console.error('Error fetching post:', error);
        setError('Failed to load post');
        setLoading(false);
      }
    };

    fetchPost();
  }, [id]);

  if (loading) {
    return (
      <div className="content-inner">
        <Container className="custom-conatiner">
          <div className="text-center">
            <img src={loader} alt="loader" style={{ height: "100px" }} />
          </div>
        </Container>
      </div>
    );
  }

  if (error) {
    return (
      <div className="content-inner">
        <Container className="custom-conatiner">
          <div className="text-center">
            <h3>{error}</h3>
          </div>
        </Container>
      </div>
    );
  }

  return (
    <div className="content-inner">
      <Container className="custom-conatiner">
        <Row>
          <Col sm={12}>
            {post ? (
              <Post post={post} setPosts={null} posts={[post]} />
            ) : (
              <div className="alert alert-danger">Post not found or cannot be displayed.</div>
            )}
          </Col>
        </Row>
      </Container>
    </div>
  );
};

export default SinglePost;
