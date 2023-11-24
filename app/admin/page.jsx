import AdminPage from "../../components/AdminPage";
import { options } from '../api/auth/[...nextauth]/options'
import { getServerSession } from 'next-auth/next';
import AdminAccess from "../../components/AdminAccess";
const baseURL = process.env.BASE_URL


const index = async() => {

  const session = await getServerSession(options)
  const admin = session.user.admin

  return (
    <div className="admin-page page">
      
        { admin ? <AdminPage baseURL={baseURL} user={session.user}/> : <AdminAccess />}
        
    </div>
  )
}

export default index








