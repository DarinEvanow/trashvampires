
#include <packing>

varying vec4 WorldPosition;
varying vec2 vUv;

uniform vec2 screenSize;
uniform sampler2D tDepth;
uniform sampler2D tEnv;
uniform float uTime;
uniform float cameraNear;
uniform float cameraFar;
uniform vec4 waterColor;
uniform vec4 foamColor;


float linearizeDepth(float z) {
  float viewZ = perspectiveDepthToViewZ( z, cameraNear, cameraFar );
  // return viewZToOrthographicDepth( viewZ, cameraNear, cameraFar );
  return viewZ;
}


float getScreenDepth(vec2 uv) {
  float depth = unpackRGBAToDepth(texture2D(tDepth, uv));
  return linearizeDepth(depth);
}
 
float getLinearDepth(vec3 pos) {
    float viewZ = (viewMatrix * vec4(pos, 1.0)).z;
    return viewZ;
}

void main() {
  vec2 uv = gl_FragCoord.xy;

  float wave = sin(vUv.x * 50. + uTime * 2.) / 2. + 0.3;
  uv -= (viewMatrix * vec4(0.0, 0.0, wave  * 10., 0.0)).xy;

  vec4 color = texture2D(tEnv, uv / screenSize);


  
  float worldDepth = getLinearDepth(WorldPosition.xyz);
  float screenDepth = getScreenDepth(gl_FragCoord.xy / screenSize);
  float offsetScreenDepth = getScreenDepth(uv / screenSize);

  float originalDiff = (worldDepth - screenDepth);
  float diff = (worldDepth - offsetScreenDepth);
  
  color = mix(color, waterColor, vec4(0.5 + diff / 200.));

  if (originalDiff < 0.6) {
    color = vec4(1);
  } else if (originalDiff < 1.0) {
    color = foamColor;
  }

  gl_FragColor = color;
}