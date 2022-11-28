out vec4 outColor;

varying vec4 WorldPosition;

void main(void)
{
  outColor = vec4(0.6, 0.2, 0.1, 0.05);
  if (WorldPosition.y > 0.85) {
    outColor = vec4(vec3(1.0), 0.2);
  }
}