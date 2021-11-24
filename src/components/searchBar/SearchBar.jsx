import React from 'react'

function SearchBar() {
    const [searchData, setSearchData] = React.useState([])
     
    const debounce = (func) => {
        let timer;
        return function (...args) {
            const context = this;
            if (timer) clearTimeout(timer)
            
            timer = setTimeout(() => {
                timer = null;
                func.apply(context,args)
            }, 1000)
        }
    }


    async function handleChange(e) {
        const { value } = e.target;
         try {
           var res = await fetch(`https://swapi.dev/api/people/?search=${value}`);

           var data = await res.json();
           setSearchData(data.results);
         } catch (error) {
           console.log(error);
         }
    }
   const optimiseversion = React.useCallback(
      
            debounce(handleChange)
        ,
        [],
    )
    // const optimiseversion = React.useCallback(debounce(handleChange), []);
console.log(searchData)
    return (
      <div>
        <input
          onChange={optimiseversion}
          name={"search"}
          type="text"
       
          placeholder="Search characters"
          className={"search"}
        />
        {searchData?.length > 0 && (
          <div>
            {searchData.map((el, index) => (
              <div key={index}>
                {" "}
                <span>{el.name}</span>{" "}
              </div>
            ))}
          </div>
        )}
      </div>
    );
}

export default SearchBar
