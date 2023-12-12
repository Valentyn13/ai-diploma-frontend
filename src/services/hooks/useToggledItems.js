import {useState, useCallback} from 'react';

const useToggledItems = () => {
  const [selectedItems, setSelectedItems] = useState({});

  const toggleItem = useCallback(item => {
    setSelectedItems(prevState => {
      if (`${item}` in prevState) {
        const {[item]: removed, ...rest} = prevState;
        return rest;
      }
      return {...prevState, [item]: true};
    });
  }, []);

  const isSelected = useCallback(item => selectedItems[item] === true, [selectedItems]);

  return {
    selectedItems,
    toggleItem,
    isSelected,
  };
};

export default useToggledItems;
