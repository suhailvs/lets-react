import { useParams } from 'react-router';

export default function User() {
  const params = useParams();
  const userid = params['id'];
  return <div>User: {userid}</div>
}