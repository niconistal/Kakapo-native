import React from "react-native";
import Reflux from "reflux";
import {Icon} from "react-native-icons";
import Color from "color";
import {Settings} from "../stores";
import {settingActions} from "../actions";
import ColorPicker from "./colorPicker";

const {NativeModules, LinkingIOS, ScrollView, AlertIOS, Image, TouchableOpacity, StyleSheet, Text, View, Platform} = React;
const {KDSocialShare} = NativeModules;

const shareDataiOS = {
  text: "Kakapo on the App Store",
  link: "https://itunes.apple.com/gb/app/kakapo/id1046673139?mt=8",
  imagelink: "http://www.kakapo.co/icons/social/kakapo.png"
};
const shareDataAndroid = Object.assign({}, shareDataiOS, {
  text: "Kakapo on the Play Store",
  link: "https://play.google.com/store/apps/details?id=com.kakapo"
});

const githubRepo = "https://github.com/bluedaniel/Kakapo-native";

export default React.createClass({
  mixins: [Reflux.connect(Settings, "settings")],
  tweet() {
    KDSocialShare.tweet(shareDataiOS,
      res => res === "not_available" ? AlertIOS.alert("Twitter not available", "Setup Twitter in Settings > Twitter") : null);
  },
  facebook() {
    KDSocialShare.shareOnFacebook(shareDataiOS,
      res => res === "not_available" ? AlertIOS.alert("Facebook not available", "Setup Facebook in Settings > Facebook") : null);
  },
  shareIntent() {
    KDSocialShare.shareIntent(shareDataAndroid,
      res => res === "not_available" ? null : null);
  },
  openURL() {
    if (Platform.OS === "ios") {
      LinkingIOS.openURL(githubRepo);
    } else {
      KDSocialShare.openURL(githubRepo)
    }
  },
  renderShareios() {
    return (
      <View>
        <TouchableOpacity style={styles.optWrap} onPress={this.facebook}>
          <Icon
            name="material|facebook"
            size={30}
            color="#fff"
            style={styles.optWrapIcon}
          />
          <Text style={styles.opt}>Share on Facebook</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.optWrap} onPress={this.tweet}>
          <Icon
            name="material|twitter"
            size={30}
            color="#fff"
            style={styles.optWrapIcon}
          />
          <Text style={styles.opt}>Share on Twitter</Text>
        </TouchableOpacity>
      </View>
    );
  },
  renderShareAndroid() {
    return (
      <View>
        <TouchableOpacity style={styles.optWrap} onPress={this.shareIntent}>
          <Icon
            name="material|share"
            size={30}
            color="#fff"
            style={styles.optWrapIcon}
          />
          <Text style={styles.opt}>Share Kakapo</Text>
        </TouchableOpacity>
      </View>
    );
  },
  render() {
    return (
      <ScrollView
        automaticallyAdjustContentInsets={false}
        style={[
          styles.settings,
          {backgroundColor: Color(this.state.settings.color).lighten(0.15).hexString()}
        ]}
      >
        <Text style={[styles.header, styles.headerFirst]}>Settings</Text>
        <Text style={styles.opt}>Color</Text>
        <ColorPicker/>
        <Text style={styles.header}>Extra</Text>
        {Platform.OS === "ios" ? this.renderShareios() : this.renderShareAndroid()}
        <TouchableOpacity
          style={styles.optWrap}
          onPress={this.openURL}
        >
          <Icon
            name="material|github"
            size={30}
            color="#fff"
            style={styles.optWrapIcon}
          />
          <Text style={styles.opt}>Fork me on GitHub!</Text>
        </TouchableOpacity>
      </ScrollView>
    );
  }
});

const styles = StyleSheet.create({
  settings: {
    flex: 1,
    flexDirection: "column",
    paddingTop: 20,
    paddingLeft: 25,
    paddingRight: 20
  },
  header: {
    fontFamily: "SFUIDisplay-Bold",
    color: "#fff",
    fontSize: 22,
    marginBottom: 13,
    marginTop: 30
  },
  headerFirst: {
    marginTop: 0
  },
  optWrap: {
    flex: 1,
    flexDirection: "row",
    alignItems: "center"
  },
  optWrapIcon: {
    height: 34,
    left: -5,
    marginTop: -8,
    position: "relative",
    width: 34
  },
  opt: {
    fontFamily: "SFUIDisplay-Medium",
    color: "#fff",
    fontSize: 16,
    marginTop: 7,
    marginBottom: 13
  }
});
