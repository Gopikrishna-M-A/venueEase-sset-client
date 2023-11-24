import HomePage from "../components/HomePage";
const baseURL = process.env.BASE_URL

const index = () => {


  return (
    <div className="page Row gap-20 JC-C">
      <HomePage baseURL={baseURL} />
    </div>
  );
};

export default index;
