import api from '../../services/api';

export interface Post {
  id: number
  author: {
    id: number
    name: string
  }
  title: string
  body: string
}

async function fetchPost() {
  const response = await api.get<Post[]>('/posts');
  return response.data;
}

function wrapPromise(promise: Promise<Post[]>) {
  let status = 'pending';
  let result: Post[] | undefined;
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

export default function fetchPostsData() {
  const postsPromise = fetchPost();
  return {
    posts: wrapPromise(postsPromise),
  };
}
