import React, { TouchableOpacity, View } from 'react-native';
import { themeActions } from '../actions';
import { swatches } from '../utils';
import styles from '../styles/colorPicker';

export default ({ color, dispatch }) => {
  const changeColor = (hex) => dispatch(themeActions.themesChange(hex, 0));

  return (
    <View style={styles.colorPicker}>
      {swatches().map(swatch =>
        <TouchableOpacity key={swatch} onPress={() => changeColor(swatch)}>
          <View style={[
            styles.swatches, {
              backgroundColor: swatch
            },
            swatch === color && styles.colorSelected
          ]}
          />
        </TouchableOpacity>)}
    </View>
  );
};
