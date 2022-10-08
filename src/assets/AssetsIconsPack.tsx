import React from 'react';
import {SvgProps} from 'react-native-svg';
import {StyleSheet} from 'react-native';
import {
  GoogleSvg,
  InstagramSvg,
  Instagram2Svg,
  FrFlagSvg,
  RuFlagSvg,
  EnFlagSvg,
  ItFlagSvg,
  DeFlagSvg,
  PtFlagSvg,
  EsFlagSvg,
} from './svg';
import {AppleSvg, QrSvg} from './svg/colorless';

const IconProvider = (Icon: React.ComponentType<SvgProps>) => ({
  toReactElement: ({style}: SvgProps) => {
    const {height, width, ...iconStyle} = StyleSheet.flatten(style);
    return <Icon height={height} width={width} style={iconStyle} />;
  },
});

export const AssetIconsPack = {
  name: 'assets',
  icons: {
    google: IconProvider(GoogleSvg),
    apple: IconProvider(AppleSvg),
    qr: IconProvider(QrSvg),
    instagram: IconProvider(InstagramSvg),
    instagram2: IconProvider(Instagram2Svg),
  },
};

export const FlagsIconsPack = {
  name: 'flags',
  icons: {
    fr: IconProvider(FrFlagSvg),
    ru: IconProvider(RuFlagSvg),
    en: IconProvider(EnFlagSvg),
    it: IconProvider(ItFlagSvg),
    de: IconProvider(DeFlagSvg),
    pt: IconProvider(PtFlagSvg),
    es: IconProvider(EsFlagSvg),
  },
};
