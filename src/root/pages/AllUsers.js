import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import SavedPost from "../../components/shared/SavedPost";
import { getAllUsers } from "../../store/actions/allUsers";
import Peoples from "../../components/shared/Peoples";

const AllUsers = () => {
  const dispatch = useDispatch();
  const { users } = useSelector((state) => state.allUsers);

  console.log(users, "byahsan");

  useEffect(() => {
    dispatch(getAllUsers());
  }, []);

  return (
    <div className="flex flex-1">
      <div className="common-container">
        <div className="max-w-5xl flex justify-between  gap-3  w-full">
          <div className="flex gap-3">
          <img
            src="/assets/icons/Vector.svg"
            alt="Add"
            height={36}
            width={36}
          />
          <h2 className="h3-bold md:h2-bold text-left-w-full">All Users</h2>
          </div>
          <div className="flex-center gap-3 bg-dark-3 rounded-xl px-4 py-2 cursor-pointer float-end">
            <p className="small-medium md:base-medium text-light-2">All</p>
            <img
              src="/assets/icons/filter.svg"
              width={20}
              height={20}
              alt="filter"
            />
          </div>
        </div>
        

          <div className="flex flex-wrap gap-9 w-full max-w-5xl">
              <ul className="grid-container">
                {users?.map((item, index) => (
                  <Peoples key={`page-${index}`} posts={item} />
                ))}
              </ul>
           
          </div>
      </div>
    </div>
  );
};

export default AllUsers;
