var regl = require('regl')()
var camera = require('regl-camera')(regl, { distance: 4 })
var icosphere = require('icosphere')
var anormals = require('angle-normals')
var glsl = require('glslify')

function createBlob (regl) {
  var mesh = icosphere(3)
  return regl({
    frag: glsl`
      precision highp float;
      #pragma glslify: snoise = require('glsl-noise/simplex/4d')
      #pragma glslify: hsl2rgb = require('glsl-hsl2rgb')
      varying vec3 vnorm, vpos;
      uniform float time, stage;
      void main () {
        gl_FragColor = vec4((vnorm+1.0)*0.5 * vec3(0,1,0)
          + hsl2rgb(snoise(vec4(vpos,time*0.1+stage)),1.0,0.5)
          ,1);
      }
    `,
    vert: glsl`
      precision highp float;
      #pragma glslify: snoise = require('glsl-noise/simplex/4d')
      attribute vec3 position, normal;
      uniform mat4 projection, view;
      varying vec3 vnorm, vpos;
      uniform float time, stage;
      uniform vec3 location;
      void main () {
        vpos = position;
        vnorm = normal;
        gl_Position = projection * view
          * vec4(position + location
            + normal*snoise(vec4(position,time+stage))*0.1,1);
      }
    `,
    attributes: {
      position: mesh.positions,
      normal: anormals(mesh.cells, mesh.positions)
    },
    uniforms: {
      time: regl.context('time'),
      location: regl.prop('location'),
      stage: regl.prop('stage')
    },
    elements: mesh.cells
  })
}

var draw = {
  blob: createBlob(regl)
}

regl.frame(function () {
  regl.clear({ color: [0,1,1,1], depth: true })
  camera(function () {
    draw.blob([
      { location: [0,0,0], stage: 0 },
      { location: [0,0,-2], stage: 1 },
      { location: [0,0,2], stage: 2 }
    ])
  })
})
