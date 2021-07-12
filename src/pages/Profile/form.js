export default [
  {
    name: 'general',
    label: '',
    fields: [
      {
        name: 'name',
        label: 'Name',
        type: 'string',
        placeholder: 'Name',
        fullWidth: true,
        required: true,
        autoFocus: true,
      },
      {
        name: 'description',
        label: 'Description',
        type: 'string',
        placeholder: 'Description',
        fullWidth: true,
      },
      {
        name: 'format',
        label: 'Format',
        type: 'select',
        fullWidth: true,
        required: true,
        options: [
          {
            value: 'mp4',
            label: 'MP4',
          },
          {
            value: 'mov',
            label: 'MOV',
          },
        ],
      },
      {
        name: 'createThumbnails',
        label: 'Create thumbnails',
        type: 'checkbox',
        defaultValue: false,
        fullWidth: true,
      },
    ],
  },
  {
    name: 'video',
    label: 'Video',
    fields: [
      {
        name: 'video.codec',
        label: 'Codec',
        type: 'select',
        dependency: {
          key: 'format',
        },
        options: [
          {
            value: 'h264',
            label: 'H264',
            dependency: ['mp4'],
          },
          {
            value: 'prores',
            label: 'ProRes',
            dependency: ['mov'],
          },
        ],
      },
      {
        name: 'video.preset',
        label: 'Preset',
        type: 'select',
        dependency: {
          key: 'video.codec',
        },
        options: [
          {
            value: 'baseline',
            label: 'Baseline',
            default: true,
            dependency: ['h264'],
          },
          {
            value: 'ipod',
            label: 'Ipod',
            dependency: ['h264'],
          },
          {
            value: 'main',
            label: 'Main',
            dependency: ['h264'],
          },
          {
            value: 'high',
            label: 'High',
            dependency: ['h264'],
          },
          {
            value: 'proreshq',
            label: 'ProRes HQ',
            dependency: ['prores'],
          },
          {
            value: 'prores422',
            label: 'ProRes 422',
            dependency: ['prores'],
          },
          {
            value: 'proreslt',
            label: 'ProRes LT',
            dependency: ['prores'],
          },
          {
            value: 'proresproxy',
            label: 'ProRes Proxy',
            dependency: ['prores'],
          },
          {
            value: 'prores4444',
            label: 'ProRes 4444',
            dependency: ['prores'],
          },
          {
            value: 'prores4444xq',
            label: 'ProRes 4444 XQ',
            dependency: ['prores'],
          },
        ],
      },
      {
        name: 'video.framerate',
        label: 'Framerate',
        type: 'select',
        match: false,
        dependency: {
          key: 'video.preset',
        },
        options: [
          {
            value: 24,
            label: '24 FPS',
          },
          {
            value: 25,
            label: '25 FPS',
          },
          {
            value: 30,
            label: '30 FPS',
          },
          {
            value: 50,
            label: '50 FPS',
          },
          {
            value: 60,
            label: '60 FPS',
          },
        ],
      },
      {
        name: 'video.bitrate',
        label: 'Bitrate',
        type: 'select',
        match: false,
        dependency: {
          key: 'video.preset',
        },
        options: [
          {
            value: 1000000,
            label: '1 Mbit/s',
            dependency: ['baseline', 'ipod', 'main', 'high'],
          },
          {
            value: 2000000,
            label: '2 Mbit/s',
            dependency: ['baseline', 'ipod', 'main', 'high'],
          },
          {
            value: 3000000,
            label: '3 Mbit/s',
            dependency: ['baseline', 'ipod', 'main', 'high'],
          },
          {
            value: 4000000,
            label: '4 Mbit/s',
            dependency: ['baseline', 'ipod', 'main', 'high'],
          },
          {
            value: 5000000,
            label: '5 Mbit/s',
            dependency: ['baseline', 'ipod', 'main', 'high'],
          },
          {
            value: 6000000,
            label: '6 Mbit/s',
            dependency: ['baseline', 'ipod', 'main', 'high'],
          },
          {
            value: 7000000,
            label: '7 Mbit/s',
            dependency: ['baseline', 'ipod', 'main', 'high'],
          },
          {
            value: 8000000,
            label: '8 Mbit/s',
            dependency: ['baseline', 'ipod', 'main', 'high'],
          },
          {
            value: 9000000,
            label: '9 Mbit/s',
            dependency: ['baseline', 'ipod', 'main', 'high'],
          },
          {
            value: 10000000,
            label: '10 Mbit/s',
            dependency: ['baseline', 'ipod', 'main', 'high'],
          },
          {
            value: 11000000,
            label: '11 Mbit/s',
            dependency: ['baseline', 'ipod', 'main', 'high'],
          },
          {
            value: 12000000,
            label: '12 Mbit/s',
            dependency: ['baseline', 'ipod', 'main', 'high'],
          },
          {
            value: 15000000,
            label: '15 Mbit/s',
            dependency: ['baseline', 'ipod', 'main', 'high'],
          },
          {
            value: 20000000,
            label: '20 Mbit/s',
            dependency: ['baseline', 'ipod', 'main', 'high'],
          },
          {
            value: 25000000,
            label: '25 Mbit/s',
            dependency: ['baseline', 'ipod', 'main', 'high'],
          },
          {
            value: 30000000,
            label: '30 Mbit/s',
            dependency: ['baseline', 'ipod', 'main', 'high'],
          },
          {
            value: 50000000,
            label: '50 Mbit/s',
            dependency: ['baseline', 'ipod', 'main', 'high'],
          },
        ],
      },
      {
        name: 'video.scaling',
        label: 'Resolution',
        type: 'select',
        match: false,
        fullWidth: true,
        dependency: {
          key: 'video.preset',
        },
        options: [
          {
            value: '4096x2160',
            label: '4096 x 2160',
            dependency: [
              'baseline',
              'ipod',
              'main',
              'high',
              'proreshq',
              'prores422',
              'proreslt',
              'proresproxy',
              'prores4444',
              'prores4444xq',
            ],
          },
          {
            value: '2048x1080',
            label: '2048 x 1080',
            dependency: [
              'baseline',
              'ipod',
              'main',
              'high',
              'proreshq',
              'prores422',
              'proreslt',
              'proresproxy',
              'prores4444',
              'prores4444xq',
            ],
          },
          {
            value: '1920x1080',
            label: '1920 x 1080',
            dependency: [
              'baseline',
              'ipod',
              'main',
              'high',
              'proreshq',
              'prores422',
              'proreslt',
              'proresproxy',
              'prores4444',
              'prores4444xq',
            ],
          },
          {
            value: '1280x720',
            label: '1280 x 720',
            dependency: [
              'baseline',
              'ipod',
              'main',
              'high',
              'proreshq',
              'prores422',
              'proreslt',
              'proresproxy',
              'prores4444',
              'prores4444xq',
            ],
          },
          {
            value: '960x540',
            label: '960 x 540',
            dependency: ['baseline', 'ipod', 'main', 'high'],
          },
          {
            value: '640x360',
            label: '640 x 360',
            dependency: ['baseline', 'ipod', 'main', 'high'],
          },
          {
            value: 'custom',
            label: 'Custom resolution',
          },
        ],
      },
      {
        name: 'video.width',
        label: 'Width',
        type: 'number',
        dependency: {
          key: 'video.scaling',
          value: 'custom',
        },
      },
      {
        name: 'video.height',
        label: 'Height',
        type: 'number',
        dependency: {
          key: 'video.scaling',
          value: 'custom',
        },
      },
    ],
  },
  {
    name: 'audio',
    label: 'Audio',
    fields: [
      {
        name: 'audio.codec',
        label: 'Codec',
        type: 'select',
        dependency: {
          key: 'format',
        },
        options: [
          {
            value: 'nablet_aac',
            label: 'AAC Nablet',
          },
          {
            value: 'mp3',
            label: 'MP3',
          },
        ],
      },
      {
        name: 'audio.preset',
        label: 'Preset',
        type: 'select',
        dependency: {
          key: 'audio.codec',
        },
        options: [
          {
            value: 'AAC_LC',
            label: 'Low complexity',
            dependency: ['nablet_aac'],
          },
        ],
      },
      {
        name: 'audio.sampleRate',
        label: 'Sample rate',
        type: 'select',
        match: false,
        options: [
          {
            value: 48,
            label: '48 Khz',
          },
          {
            value: 96,
            label: '96 Khz',
          },
        ],
      },
      {
        name: 'audio.sampleSize',
        label: 'Sample size',
        type: 'select',
        match: false,
        options: [
          {
            value: 16,
            label: '16',
          },
          {
            value: 24,
            label: '24',
          },
        ],
      },
    ],
  },
];
