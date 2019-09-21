import deepmerge from "deepmerge";
import ResponsiveStylesheet from "react-native-responsive-stylesheet"
import { ScaledSheet } from "react-native-size-matters";

const commonStyles = ScaledSheet.create({
  background: {
    flex: 1
  },
  imageBackground: {
    resizeMode: "cover"
  }
});

const portraitStyles = {};

const landscapeStyles = {};

export default function computeStyleSheet(): any {
  return ResponsiveStylesheet.createOriented({
    landscape: deepmerge(commonStyles, landscapeStyles),
    portrait: deepmerge(commonStyles, portraitStyles)
  });
}
