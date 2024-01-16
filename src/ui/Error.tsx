import {
  useNavigate,
  useRouteError,
  isRouteErrorResponse,
} from 'react-router-dom';

function Error() {
  const navigate = useNavigate();
  const error = useRouteError();

  return (
    <div>
      <h1>Something went wrong 😢</h1>
      {/* <p>{error.data || error.data}</p> */}
      <p>{isRouteErrorResponse(error) && error.data}</p>

      <p>MESSAGE</p>
      <button onClick={() => navigate(-1)}>&larr; Go back</button>
    </div>
  );
}

export default Error;
