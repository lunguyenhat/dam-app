import React, { useCallback, useState } from 'react';
import { observer } from 'mobx-react';
import { DAM_COLLECTION_FIELD_KEY } from 'aesirx-dma-lib';
import { useDamViewModel } from 'store/DamStore/DamViewModelContextProvider';
import { DAM_COLUMN_INDICATOR } from 'constants/DamConstant';
import { Form } from 'react-bootstrap';
import styles from '../index.module.scss';
const CollectionName = observer(({ item }) => {
  const { damListViewModel, damFormViewModel } = useDamViewModel();
  const [value, setValue] = useState(item[DAM_COLUMN_INDICATOR.NAME]);
  const [isFocus, setIsFocus] = useState(false);
  const handleUpdateFolder = useCallback(async () => {
    if (value !== item[DAM_COLUMN_INDICATOR.NAME] && value) {
      await damListViewModel.updateCollections({
        ...item,
        [DAM_COLLECTION_FIELD_KEY.NAME]: value,
      });
    } else {
      setValue(item[DAM_COLUMN_INDICATOR.NAME]);
    }

    damFormViewModel.setOffEditCollection();
  }, [value]);

  return (
    <Form.Control
      as={'input'}
      type={'text'}
      className={`${
        !damListViewModel.isList ? 'text-center  mx-auto ' : ''
      } bg-transparent px-0 py-1 w-fit ${isFocus ? 'pe-auto' : 'pe-none'} ${styles.input}`}
      id={`id_${item[DAM_COLUMN_INDICATOR.ID]}`}
      // defaultValue={value}
      value={value}
      onChange={(e) => setValue(e.target.value)}
      onFocus={(e) => {
        e.target.select();
        setIsFocus(true);
      }}
      onBlur={() => {
        if (isFocus) {
          handleUpdateFolder();
          setIsFocus(false);
        }
      }}
      onKeyDown={(e) => {
        if (e.keyCode === 13) {
          e.target.blur();
        }
      }}
    />
  );
});

export default CollectionName;
