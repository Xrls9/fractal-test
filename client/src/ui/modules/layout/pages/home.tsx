import useNavigation from "../../../../core/services/navigationService";
import Button from "../../../shared/atoms/Button";

const Home: React.FC = () => {
  const { goTo } = useNavigation();
  return (
    <div className="flex w-full h-[100vh] p-[20px] justify-center">
      <div className="flex flex-col gap-[100px] pb-[25px]">
        <h1>Home</h1>
        <div className="flex flex-col gap-[20px]">
          <Button label="Orders" onClick={() => goTo("/orders")}></Button>
          <Button label="Products" onClick={() => goTo("/products")}></Button>
        </div>
      </div>
    </div>
  );
};

export default Home;
