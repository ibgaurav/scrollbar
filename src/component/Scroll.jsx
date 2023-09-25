import React, { useEffect, useRef, useState } from 'react';
import './scroll.css';

const Scroll = () => {
  const arr = [1, 2, 3, 4, 5, 6,7,8];
  const containerRef = useRef(null);

  let[count,setcount]=useState(60)
   let[state,setstate]=useState(arr)
    function isScrollbarNearHorizontalEdges() {
        let { scrollWidth, scrollLeft, clientWidth } = document.documentElement;
        if (scrollLeft + clientWidth >= scrollWidth) {
            console.log('hii');
            showdata()
          }
    }
  
    let showdata = () => {
        setcount(count + 1);
        setTimeout(() => {     
          const newState = [...state];
          for (var i = 9; i < count; i++) {
            newState.push(i);
            
          }
          setstate(newState);
        }, 300);
      };
      

    function handleScroll() {
      if (isScrollbarNearHorizontalEdges()) {
        showdata()
      }
    }

  useEffect(() => {
  ;

    const observer = new IntersectionObserver((entries, observer) => {
      entries.forEach((entry) => {
        entry.target.classList.toggle("show",entry.isIntersecting)
      });
    },{threshold: 1});

    
    if (containerRef.current) {
      containerRef.current.querySelectorAll('.cards').forEach((card) => {
        observer.observe(card);
      });
    }

    window.addEventListener("scroll", handleScroll);
    return () => {
      observer.disconnect();
      window.removeEventListener("scroll", handleScroll);
    };
  }, [showdata]);

  return (
    <div>
      <div className="container" ref={containerRef}>
        {state.map((val) => {
          return (
            <div className="cards" key={val}>
              {val}
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default Scroll;
