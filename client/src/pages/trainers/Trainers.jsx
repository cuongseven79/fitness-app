import React, { useEffect, useState } from "react";
import Header from "../../components/Header";
import HeaderImage from "../../images/header_bg_5.jpg";
import { AiFillStar } from "react-icons/ai";
import { FaCrown } from "react-icons/fa";
import "./trainers.css";
import { database } from "../../config/firebase-config";
import { collection, getDocs } from "firebase/firestore";
import SectionHead from "../../components/SectionHead";
import Card from "../../components/Card";
import { Link } from "react-router-dom";
import { Button, Dropdown, Menu, Row, Space, Pagination } from "antd";
import { useAuth } from "../../context/AuthContext";
import loadingGIF from "../../images/loading.gif"


import ModalCustom from "../../components/ModalCustom";


const TrainerInfoItem = ({ label, value }) => (
	value && (
		<li className="flex justify-between items-center gap-10 text-sm font-medium text-gray-900 dark:text-white">
			<label>{label}</label>
			<span>{value}</span>
		</li>
	)
);
const TrainerModal = ({ open, setOpen, trainer }) => {
	const { displayName, price, photoURL, certURL, yearsOfExp, age, address, gender } = trainer || {};

	return (
		<ModalCustom className="text-black" title="Trainer Information" open={open} setOpen={setOpen} >
			<div className="py-4 flex justify-between">
				<ul className="space-y-7">
        <TrainerInfoItem label="Display Name: " value={displayName} />
        <TrainerInfoItem label="Gender: " value={gender} />
        <TrainerInfoItem label="Age" value={age} />
        <TrainerInfoItem label="Year Of Experiences: " value={yearsOfExp} />
        <TrainerInfoItem label="Address" value={address} />
        <TrainerInfoItem label="Price: " value={`$ ${price}/month`} />
				</ul>
				<img src={photoURL} className='w-40 h-40 rounded-full' alt="Trainer" />
			</div>
			<div className={`${!certURL && "hidden"}`}>
				<h2 className="py-5 font-medium text-gray-900 dark:text-white">Certificate</h2>
				<div className="overflow-auto flex gap-5">
					{certURL?.map((cert, index) => <img key={index} src={cert} className='w-40' alt={`Certificate ${index + 1}`} />)}
				</div>
			</div>
		</ModalCustom>
	)
}


const Trainers = () => {
  const [open, setOpen] = useState(false);
  const [users, setUsers] = useState([]);
  const [sortedList, setSortedList] = useState([]);
  const [trainerInfor, setTrainerInfor] = useState(null);
  const { TrainersAll } = useAuth(); 
  const [filter, setFilter] = useState("all");
  const [selectedMenuItem, setSelectedMenuItem] = useState(null);
  const [currentPage, setCurrentPage] = useState(3);
const [pageSize, setPageSize] = useState(6);
const [loading, setLoading] = useState(false);

async function fetchData() {
  try {
    const trainers = await TrainersAll();
    setUsers(trainers);
    setSortedList(trainers);
  } catch (error) {
    console.error("Error fetching trainers:", error);
  } finally {
    setLoading(false); // Kết thúc việc tải dữ liệu, đặt loading thành false
  }
}

  

useEffect(() => {
  setLoading(true);
  fetchData();
}, [])
if (loading) {
  return <div className="w-40 mt-44 mx-auto" >
            <img src={loadingGIF} alt="Loading" />
        </div>
}


  const handleRatingClick = ({ key }) => {

    sortRating(key);
    setSelectedMenuItem(key);

    
  };
  const rating = (
    <Menu onClick={handleRatingClick}>
      <Menu.Item key="1" className={selectedMenuItem === "1" ? "selected" : ""}>1 sao</Menu.Item>
      <Menu.Item key="2" className={selectedMenuItem === "2" ? "selected" : ""}>2 sao</Menu.Item>
      <Menu.Item key="3" className={selectedMenuItem === "3" ? "selected" : ""}>3 sao </Menu.Item>
      <Menu.Item key="4" className={selectedMenuItem === "4" ? "selected" : ""}>4 sao</Menu.Item>
      <Menu.Item key="5" className={selectedMenuItem === "5" ? "selected" : ""}>5 sao</Menu.Item>
    </Menu>
  );

  
  const handleFieldClick = ({ key }) => {
    sortField(key);
    setSelectedMenuItem(key);
  };
  

  const field = (
    <Menu onClick={handleFieldClick}>
      <Menu.Item key="yoga" className={selectedMenuItem === "yoga" ? "selected" : ""}>yoga</Menu.Item>
      <Menu.Item key="boxing" className={selectedMenuItem === "boxing" ? "selected" : ""}>boxing</Menu.Item> 
      <Menu.Item key="aerobic" className={selectedMenuItem === "aerobic" ? "selected" : ""}>aerobic</Menu.Item>
      <Menu.Item key="taekwondo" className={selectedMenuItem === "taekwondo" ? "selected" : ""}>taekwondo</Menu.Item>
      <Menu.Item key="pilates" className={selectedMenuItem === "pilates" ? "selected" : ""}>pilates</Menu.Item>
    </Menu>
  );
  const handlePriceClick = ({ key }) => {
    const priceInterval = priceIntervals[key];
    if (priceInterval) {
      sortPrice(parseInt(priceInterval.min), parseInt(priceInterval.max));
      setSelectedMenuItem(key);
    }
  };
    
  const price = ( 
    <Menu onClick={handlePriceClick}>
      <Menu.Item key="1" className={selectedMenuItem === "1" ? "selected" : ""}>0$ - 2000$</Menu.Item>
      <Menu.Item key="2" className={selectedMenuItem === "2" ? "selected" : ""}>2001$ - 4000$</Menu.Item>
      <Menu.Item key="3" className={selectedMenuItem === "3" ? "selected" : ""}>4001$ - 6000$</Menu.Item>
      <Menu.Item key="4" className={selectedMenuItem === "4" ? "selected" : ""}>6001$ - 8000$</Menu.Item>
      <Menu.Item key="5" className={selectedMenuItem === "5" ? "selected" : ""}>8001$ - 10000$</Menu.Item>
    </Menu>
  );

  const priceIntervals = {
    1: { min: 0, max: 2000 }, 
    2: { min: 2001, max: 4000 },
    3: { min: 4001, max: 6000 },
    4: { min: 6001, max: 8000 },
    5: { min: 8001, max: 10000 }, 
  }; 
  const getAll = () => {
    setLoading(true)
    setFilter("all");
    setTimeout(() =>{
      setSortedList(users);
      setLoading(false); 
    },1000);
   
  };

  const sortRating = (rating) => {
    setLoading(true);
    setFilter("rating");
    setTimeout(() => {
      setSortedList(users.filter((user) => user.rating === rating));
      setLoading(false); 
  }, 1000); 
  };

  const sortField = (field) => {
    setLoading(true); 
    setFilter("field");
    setTimeout(() => {
    setSortedList(users.filter((user) => user.field === field)); 
    setLoading(false);
  }, 1000);
  };

  const sortPrice = (minPrice, maxPrice) => {
    setLoading(true); 
    setFilter("price");
    setTimeout(() => {
    setSortedList(
      users.filter((user) => user.price >= minPrice && user.price <= maxPrice)

    );
    setLoading(false); 
  }, 1000);
  };

  const paginate = (items, currentPage, pageSize) => {
    if (!items) return [];
    const startIndex = (currentPage - 1) * pageSize;
    return items.slice(startIndex, startIndex + pageSize);
    
  };

  const paginatedList = paginate(sortedList, currentPage, pageSize);

  return (
    <>
      <Header image={HeaderImage} title="Our Trainers">
        Adipisicing labore laboris ea sunt cillum ea velit.Adipisicing labore la
        boris ea sunt cillum ea velit. sunt cillum ea velit.
      </Header>
      <section className="trainers">
        <div className="container">
          <SectionHead icon={<FaCrown />} title="Trainers" />
          <Space style={{ margin: '20px 0' }}></Space>

          <Row style={{ justifyContent: "space-evenly", width: "50%", margin: '30px 0' }}>
          <Space></Space>
          <Button type="primary" style={{background: filter === "all" ? "#0080ff" :"#4b5c988f"}} onClick={() => getAll()}>All</Button>
          <Space></Space>
          <Dropdown overlay={rating} placement="bottomLeft">
            <Button type="primary" style={{background: filter === "rating" ? "#0080ff" : "#4b5c988f"}}>Rating</Button>
          </Dropdown>
          <Dropdown overlay={field} placement="bottomLeft">
            <Button type="primary" style={{background: filter === "field" ? "#0080ff" : "#4b5c988f"}}>Field</Button>
          </Dropdown>
          <Space></Space>
          <Dropdown overlay={price} placement="bottomLeft">
            <Button type="primary" style={{background: filter === "price" ? "#0080ff" : "#4b5c988f"}}>Price</Button>
          </Dropdown>

        </Row>
        <div className="trainers">
        <div className="container grid sm:grid-cols-1 md:grid-cols-2 lg:grid-cols-3 2xl:grid-cols-3 gap-16">
          {paginatedList && paginatedList.length > 0 ? (
            paginatedList.map((trainer) => (
              <Card className="" key={trainer.id}>
                <div
                  onClick={() => {
                    setOpen(true);
                    setTrainerInfor(trainer);
                    console.log(trainer);
                  }}
                  className="relative group mb-5 transition-all duration-200 hover:saturate-100 cursor-pointer"
                >
                  <div className="w-full h-60 bg-contain">
                    <img
                      src={trainer.photoURL}
                      className="rounded-3xl w-full h-full"
                      style={{ objectPosition: "10px -20px" }}
                      alt="trainer one"
                    />
                  </div>
                  <div className="opacity-0 bg-gradient-to-t from-gray-800 via-gray-800 to-opacity-30 group-hover:opacity-50 absolute top-0 left-0 h-full w-full "></div>
                  <div className="absolute top-0 left-0 w-full h-full flex justify-center items-center opacity-0 hover:opacity-100 ">
                    <h1 className="text-lg">View information</h1>
                  </div>
                </div>
                <h3 className="text-[20px] text-[#EAB308] font-semibold">
                  {trainer.displayName}
                </h3>
                <p>{trainer.field}</p>
                <div className="my-3 flex justify-evenly mx-auto items-center">
                  <h1>{`$ ${trainer.price}`}</h1>
                  <select name="" id="" className="text-black px-1 rounded-md">
                    <option value="">1 month</option>
                    <option value="">2 month</option>
                    <option value="">3 month</option>
                  </select>
                </div>
                <div className="flex justify-center mb-5">
                  {trainer.rating > 0 &&
                    Array(Math.round(trainer.rating)).fill(
                      <AiFillStar color="yellow" />
                    )}
                </div>
                <Link to={"plans"} className="btn sm">
                  Booking
                </Link>
              </Card>
            ))
          ) : (
            <div className="text-center text-red-500">No coach information found</div>
          )}
        
        </div>
      </div>
      <Pagination style={{margin: '30px 0',  display: 'flex', justifyContent: 'center',}}
      current={currentPage}
      pageSize={pageSize}
      total={sortedList.length}
      onChange={(page, pageSize) => setCurrentPage(page)}
    />
        </div>
        <TrainerModal open={open} setOpen={setOpen} trainer={trainerInfor} />
      </section>
    </>
  );
};

export default Trainers;
