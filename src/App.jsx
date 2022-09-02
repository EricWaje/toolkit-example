import Layout from './pages/Home';
import { Route, Routes } from 'react-router-dom';
import PostsList from './features/posts/PostsList';
import PostForm from './features/posts/PostForm';
import SinglePost from './features/posts/SinglePost';
import EditPost from './features/posts/EditPost';

function App() {
    return (
        <div>
            <Routes>
                <Route path="/" element={<Layout />}>
                    <Route index element={<PostsList />} />
                    <Route path="post">
                        <Route index element={<PostForm />} />
                        <Route path=":postId" element={<SinglePost />} />
                        <Route path="edit/:postId" element={<EditPost />} />
                    </Route>
                </Route>
            </Routes>
        </div>
    );
}

export default App;
