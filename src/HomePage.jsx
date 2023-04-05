import axios from 'axios';
import { useState, useEffect } from 'react';
import { Link as NavLink } from 'react-router-dom';
import { useLocation, useNavigate } from 'react-router-dom';
import { Pagination, TextField, Stack, Link, LinearProgress, PaginationItem } from '@mui/material';

const BASE_URL = 'http://hn.algolia.com/api/v1/search?';

const HomePage = (props) => {
  const location = useLocation();
  const navigate = useNavigate();
  const [posts, setPosts] = useState([]);
  const [query, setQuery] = useState('react');
  const [page, setPage] = useState(parseInt(location.search?.split('=')[1] || 1));
  const [pageQty, setPageQty] = useState(0);
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    setIsLoading(true)
    axios.get(BASE_URL + `query=${query}&page=${page - 1}`).then(
      ({data}) => {
        console.log(data)
        setPosts(data.hits)
        setPageQty(data.nbPages)
        setIsLoading(false)

        if (data.nbPages < page) {
          setPage(1);
          navigate('/?page=1',{replace: true})
        }
      }
    )
  }, [query, page, navigate]);

  const handleFetch = () => {
    setIsLoading(true)

  }

  return (
    <>
        <TextField
        fullWidth
        label="query"
        value={query}
        onChange={(event) => setQuery(event.target.value)}
      />
      <Stack spacing={2}>
        {!!pageQty && (
          <Pagination
            count={pageQty}
            page={page}
            onChange={(_, num) => setPage(num) && handleFetch}
            disabled={isLoading}
            sx={{marginY: 3, marginX: 'auto'}} 
            showFirstButton
            showLastButton
            renderItem={
                (item) => (
                    <PaginationItem
                        component={NavLink}
                        to={`/?page=${item.page}`}
                        {...item}
                    />
                )
            }
          />
        )}
        {!!isLoading ? <LinearProgress/> : <>
        {
          posts.map(post => (
            <Link
              key={post.objectID}
              href={post.url}
            >
              {post.title || post.story_title}
            </Link>
          ))
        }
        </>}
      </Stack>
    </>
  )
}

export default HomePage