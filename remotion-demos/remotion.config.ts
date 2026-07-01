import { Config } from "@remotion/cli/config";

Config.setVideoImageFormat("jpeg");
Config.setJpegQuality(92);
Config.setOverwriteOutput(true);
Config.setPublicDir("./public");
Config.setColorSpace("bt709");

Config.overrideFfmpegCommand(({ args }) => [
  ...args,
  "-color_range",
  "pc",
  "-color_primaries",
  "bt709",
  "-color_trc",
  "bt709",
  "-colorspace",
  "bt709",
]);
