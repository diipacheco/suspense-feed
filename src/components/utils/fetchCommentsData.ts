import api from '../../services/api';

export interface Comment {
  postId: number
  id: number
  comment_author: {
    id: number
    email: string
    avatar_url: string
  }
  body: string
}

async function fetchComments(id: number) {
  const response = await api.get<Comment[]>(`/comments?postId=${id}`);
  return response.data;
}

function wrapPromise(promise: Promise<Comment[]>) {
  let status = 'pending';
  let result: Comment[] | undefined;
  const suspender = promise.then((response) => {
    status = 'success';
    result = response;
  },
  (error) => {
    status = 'error';
    result = error;
  });

  return {
    read() {
      if (status === 'pending') {
        throw suspender;
      } else if (status === 'error') {
        throw result;
      }
      return result;
    },
  };
}

export default function fetchCommentsData(id: number) {
  const commentsPromise = fetchComments(id);
  return {
    comments: wrapPromise(commentsPromise),
  };
}
