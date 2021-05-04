#define M_PI 3.1415926535897932384626433832795

const int maxIter = 200;

vec3 hsl2rgb( in vec3 c )
{
    vec3 rgb = clamp( abs(mod(c.x*6.0+vec3(0.0,4.0,2.0),6.0)-3.0)-1.0, 0.0, 1.0 );

    return c.z + c.y * (rgb-0.5)*(1.0-abs(2.0*c.z-1.0));
}

int iterate(vec2 a, vec2 c) {
    vec2 prev = a;
    vec2 square;
    for(int i = 0; i<maxIter; i++) {
        square = vec2(
            pow(prev.x, 2.0) - pow(prev.y, 2.0),
            2.0 * prev.x * prev.y
        ) + c;
        if (length(square) > 2.0) {
            return i;
        }
        prev = square;
    }
    return maxIter;
}

void mainImage( out vec4 fragColor, in vec2 fragCoord )
{
    vec2 c = iMouse.xy/iResolution.xy*4.0-2.0;

    vec2 uv = fragCoord/iResolution.xy;
    vec2 suv = uv * 4.0 - 2.0;
    suv = suv / vec2(1.0, 1.8); 
    
    int iterations = iterate(suv, c);

    float intensity = float(iterations) / float(maxIter);
    fragColor = vec4(hsl2rgb(vec3(intensity, 1, intensity)), 1);
}