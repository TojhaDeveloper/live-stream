import React, { useEffect, useRef, useState } from "react";
import styles from "./dropdown.module.css";
const DropDown = ({ placeholder, options,tabIndex }) => {
  const [val, setVal] = useState(placeholder);
  const [isOpen, setIsOpen] = useState(false);
  const [highlightedIndex, setHighlightedIndex] = useState(0);
  const containerRef = useRef(null);

  const handleClick = (option) => {
    setVal(option);
    setIsOpen(false);
  };

  useEffect(() => {
    if (isOpen) setHighlightedIndex(0);
  }, [isOpen]);

  useEffect(() => {
    const handler = (e) => {
      if (e.target !== containerRef.current) {
        return;
      }
      switch (e.code) {
        case "Enter":
        case "Space":
          setIsOpen((prev) => !prev);
          if (isOpen) handleClick(options[highlightedIndex]);
          break;
        case "ArrowUp":
        case "ArrowDown": {
          if (!isOpen) {
            setIsOpen(true);
            break;
          }
          const newValue = highlightedIndex + (e.code === "ArrowDown" ? 1 : -1);
          if (newValue >= 0 && newValue < options.length) {
            setHighlightedIndex(newValue);
          }
          break;
        }
        case "Escape":
          setIsOpen(false);
          break;
      }
    };

      containerRef?.current.addEventListener("keydown", handler);

    return () => {
        return containerRef?.current.removeEventListener("keydown", handler);
    };
  }, [isOpen, highlightedIndex, options]);

  return (
    <div
      ref={containerRef}
      className={styles.container}
      onBlur={() => setIsOpen(false)}
      onClick={() => setIsOpen((prev) => !prev)}
      tabIndex={tabIndex}
    >
      <div className={styles.info}>{val}</div>
      {/* <input type="text" value={val} placeholder={placeholder} readOnly /> */}
      <div className={styles.caret}></div>
      <ul className={`${styles.options} ${isOpen ? styles.show : ""}`}>
        {options.map((o, idx) => (
          <li
            key={`${o}-${idx}`}
            onClick={(e) => {
              // console.log(e.target);
              e.stopPropagation();
              handleClick(o);
            }}
            onMouseEnter={() => setHighlightedIndex(idx)}
            className={`${styles.option} ${
              idx === highlightedIndex ? styles.highlighted : ""
            }`}
          >
            {o}
          </li>
        ))}
      </ul>
    </div>
  );
};

export default DropDown;
