import Home from "../components/Home";
const baseURL = process.env.BASE_URL

const index = () => {


  return (
    <div className="page">
      <Home baseURL={baseURL} />
    </div>
  );
};

export default index;
