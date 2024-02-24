import { useEffect, useState } from "react";
import { useInView } from "react-intersection-observer";
import { Input } from "reactstrap";
import GridPostList from "../../components/shared/GridPostList";
import { useDispatch, useSelector } from "react-redux";
import { getPosts } from "../../store/actions/postAction";

const SearchResults = ({ isSearchFetching, searchedPosts }) => {

  if (isSearchFetching) {
    return "Loading...";
  } else if (searchedPosts && searchedPosts.documents.length > 0) {
    return <GridPostList posts={searchedPosts.documents} />;
  } else {
    return (
      <p className="text-light-4 mt-10 text-center w-full">No results found</p>
    );
  }
};

const Explore = () => {
  const { ref, inView } = useInView();
  const dispatch = useDispatch()
  const { posts } = useSelector((state) => state.post);
  const { uid } = useSelector((state) => state.auth)


  const [searchValue, setSearchValue] = useState("");
  // const debouncedSearch = useDebounce(searchValue, 500);
  // const { data: searchedPosts, isFetching: isSearchFetching } =
  //   useSearchPosts(debouncedSearch);

  // useEffect(() => {
  //   if (inView && !searchValue) {
  //     // fetchNextPage();
  //   }
  // }, [inView, searchValue]);

  const shouldShowSearchResults = searchValue !== "";
  // const shouldShowPosts =
  //   (!shouldShowSearchResults &&
  //     posts?.pages.every((item) => item?.documents.length === 0)) ||
  //   (searchValue === "" && posts == null);

  useEffect(() => {
    dispatch(getPosts(uid));
  }, []);

  if (!posts)
    return <div className="flex-center w-full h-full">Loading...</div>;

  return (
    <div className="explore-container">
      <div className="explore-inner_container">
        <h2 className="h3-bold md:h2-bold w-full">Search Posts</h2>
        <div className="flex gap-1 px-4 w-full rounded-lg bg-dark-4">
          <img
            src="/assets/icons/search.svg"
            width={24}
            height={24}
            alt="search"
          />
          <Input
            type="text"
            placeholder="Search"
            className="explore-search outline-none"
            value={searchValue}
            onChange={(e) => {
              const { value } = e.target;
              setSearchValue(value);
            }}
          />
        </div>
      </div>

      <div className="flex-between w-full max-w-5xl mt-16 mb-7">
        <h3 className="body-bold md:h3-bold">Popular Today</h3>

        <div className="flex-center gap-3 bg-dark-3 rounded-xl px-4 py-2 cursor-pointer">
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
          {shouldShowSearchResults ? (
            <SearchResults
            // isSearchFetching={isSearchFetching}
            // searchedPosts={searchedPosts}
            />
          ) : (
            //   shouldShowPosts ? (
            //   <p className="text-light-4 mt-10 text-center w-full">End of posts</p>
            // ) :

            posts?.map((item, index) => (
              <GridPostList key={`page-${index}`} posts={item || []} />
            ))
          )}
        </ul>
      </div>

      {/* {hasNextPage && !searchValue && (
        <div ref={ref} className="mt-10">
          "Loading..."
        </div>
      )} */}
    </div>
  );
};

export default Explore;
