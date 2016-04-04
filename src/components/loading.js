import React, { ActivityIndicatorIOS, StyleSheet, View } from 'react-native';

const styles = StyleSheet.create({
  activityContainer: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center'
  },
  activityIndicator: {
    height: 80,
    width: 80
  }
});

export default React.createClass({
  render() {
    return (
      <View style={styles.activityContainer}>
        <ActivityIndicatorIOS
          animating={!this.props.loaded}
          style={styles.activityIndicator}
          size="large"
        />
      </View>
    );
  }
});
