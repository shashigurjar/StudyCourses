import "./App.css";
import React from "react";
import {apiUrl, filterData} from "./data";
import Cards from "./components/Cards";
import Filter from "./components/Filter";
import Navbar from "./components/Navbar"
import { useEffect } from "react";
import { useState } from "react";
import { toast } from "react-toastify";
import Spinner from "./components/Spinner";

function App() {
const [courses, setCourses] = useState([]);
const [loading, setLoading] = useState(true);
const [category, setCategory] = useState(filterData[0].title);

async function fetchData(){
      setLoading(true)
        try{
          const res = await fetch(apiUrl);
          const output = await res.json();
          setCourses(output.data);
        }
        catch(error){
          toast.error("Network Problem")
        }
        setLoading(false);
    }
  useEffect( ()=>{
    fetchData();
  }, [] )
  return (<div className="min-h-screen flex flex-col bg-slate-600">
    <div>
        <Navbar/>
    </div>
    <div >
      <div>
          <Filter filterData = {filterData} category = {category} setCategory ={setCategory} />
      </div>
      <div className="w-11/12 max-w-[1200px] mx-auto flex flex-wrap justify-center items-center min-h-[50vh]">
        {
          loading ? (<Spinner/>) : (  <Cards courses = {courses} category ={category} />)
        }
      </div>
    </div>
    
  </div>
  )
}

export default App;