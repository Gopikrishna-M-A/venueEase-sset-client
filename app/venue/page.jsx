import VenueDetails from "../../components/VenueDetails";
import { options } from '../api/auth/[...nextauth]/options'
import { getServerSession } from 'next-auth/next';
const baseURL = process.env.BASE_URL;




const index = async() => {

  const session = await getServerSession(options)

  return (
    <div className="page Row venue-page">
      <VenueDetails baseURL={baseURL} user={session.user} />
    </div>
  );
};

export default index;
