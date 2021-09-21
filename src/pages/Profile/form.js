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
        defaultValue: 'mp4',
        options: [
          {
            value: 'mp4',
            label: 'MP4',
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
        defaultValue: 'h264',
        dependency: ['format'],
        options: [
          {
            value: 'h264',
            label: 'H264',
            dependency: [{ format: 'mp4' }],
          },
        ],
      },
      {
        name: 'video.preset',
        label: 'Preset',
        type: 'select',
        dependency: ['video.codec'],
        options: [
          {
            value: ['baseline'],
            label: 'Baseline',
            dependency: [{ 'video.codec': 'h264' }],
          },
          {
            value: ['ipod'],
            label: 'Ipod',
            dependency: [{ 'video.codec': 'h264' }],
          },
          {
            value: ['main'],
            label: 'Main',
            dependency: [{ 'video.codec': 'h264' }],
          },
          {
            value: ['high'],
            label: 'High',
            dependency: [{ 'video.codec': 'h264' }],
          },
        ],
      },
      {
        name: 'video.framerate',
        label: 'Framerate',
        type: 'select',
        match: true,
        options: [
          {
            value: { numerator: 1, denominator: 24 },
            label: '24 FPS',
          },
          {
            value: { numerator: 1, denominator: 25 },
            label: '25 FPS',
          },
          {
            value: { numerator: 1, denominator: 30 },
            label: '30 FPS',
          },
          {
            value: { numerator: 1, denominator: 50 },
            label: '50 FPS',
          },
          {
            value: { numerator: 1, denominator: 60 },
            label: '60 FPS',
          },
        ],
      },
      {
        name: 'video.bitrate',
        label: 'Bitrate',
        type: 'select',
        match: true,
        dependency: ['video.preset'],
        options: [
          {
            value: 1000000,
            label: '1 Mbit/s',
            dependency: [
              { 'video.preset': ['high'] },
              { 'video.preset': ['main'] },
              { 'video.preset': ['ipod'] },
              { 'video.preset': ['baseline'] },
            ],
          },
          {
            value: 2000000,
            label: '2 Mbit/s',
            dependency: [
              { 'video.preset': ['high'] },
              { 'video.preset': ['main'] },
              { 'video.preset': ['ipod'] },
              { 'video.preset': ['baseline'] },
            ],
          },
          {
            value: 3000000,
            label: '3 Mbit/s',
            dependency: [
              { 'video.preset': ['high'] },
              { 'video.preset': ['main'] },
              { 'video.preset': ['ipod'] },
              { 'video.preset': ['baseline'] },
            ],
          },
          {
            value: 4000000,
            label: '4 Mbit/s',
            dependency: [
              { 'video.preset': ['high'] },
              { 'video.preset': ['main'] },
              { 'video.preset': ['ipod'] },
              { 'video.preset': ['baseline'] },
            ],
          },
          {
            value: 5000000,
            label: '5 Mbit/s',
            dependency: [
              { 'video.preset': ['high'] },
              { 'video.preset': ['main'] },
              { 'video.preset': ['ipod'] },
              { 'video.preset': ['baseline'] },
            ],
          },
          {
            value: 6000000,
            label: '6 Mbit/s',
            dependency: [
              { 'video.preset': ['high'] },
              { 'video.preset': ['main'] },
              { 'video.preset': ['ipod'] },
              { 'video.preset': ['baseline'] },
            ],
          },
          {
            value: 7000000,
            label: '7 Mbit/s',
            dependency: [
              { 'video.preset': ['high'] },
              { 'video.preset': ['main'] },
              { 'video.preset': ['ipod'] },
              { 'video.preset': ['baseline'] },
            ],
          },
          {
            value: 8000000,
            label: '8 Mbit/s',
            dependency: [
              { 'video.preset': ['high'] },
              { 'video.preset': ['main'] },
              { 'video.preset': ['ipod'] },
              { 'video.preset': ['baseline'] },
            ],
          },
          {
            value: 9000000,
            label: '9 Mbit/s',
            dependency: [
              { 'video.preset': ['high'] },
              { 'video.preset': ['main'] },
              { 'video.preset': ['ipod'] },
              { 'video.preset': ['baseline'] },
            ],
          },
          {
            value: 10000000,
            label: '10 Mbit/s',
            dependency: [
              { 'video.preset': ['high'] },
              { 'video.preset': ['main'] },
              { 'video.preset': ['ipod'] },
              { 'video.preset': ['baseline'] },
            ],
          },
          {
            value: 11000000,
            label: '11 Mbit/s',
            dependency: [
              { 'video.preset': ['high'] },
              { 'video.preset': ['main'] },
              { 'video.preset': ['ipod'] },
              { 'video.preset': ['baseline'] },
            ],
          },
          {
            value: 12000000,
            label: '12 Mbit/s',
            dependency: [
              { 'video.preset': ['high'] },
              { 'video.preset': ['main'] },
              { 'video.preset': ['ipod'] },
              { 'video.preset': ['baseline'] },
            ],
          },
          {
            value: 15000000,
            label: '15 Mbit/s',
            dependency: [
              { 'video.preset': ['high'] },
              { 'video.preset': ['main'] },
              { 'video.preset': ['ipod'] },
              { 'video.preset': ['baseline'] },
            ],
          },
          {
            value: 20000000,
            label: '20 Mbit/s',
            dependency: [
              { 'video.preset': ['high'] },
              { 'video.preset': ['main'] },
              { 'video.preset': ['ipod'] },
              { 'video.preset': ['baseline'] },
            ],
          },
          {
            value: 25000000,
            label: '25 Mbit/s',
            dependency: [
              { 'video.preset': ['high'] },
              { 'video.preset': ['main'] },
              { 'video.preset': ['ipod'] },
              { 'video.preset': ['baseline'] },
            ],
          },
          {
            value: 30000000,
            label: '30 Mbit/s',
            dependency: [
              { 'video.preset': ['high'] },
              { 'video.preset': ['main'] },
              { 'video.preset': ['ipod'] },
              { 'video.preset': ['baseline'] },
            ],
          },
          {
            value: 50000000,
            label: '50 Mbit/s',
            dependency: [
              { 'video.preset': ['high'] },
              { 'video.preset': ['main'] },
              { 'video.preset': ['ipod'] },
              { 'video.preset': ['baseline'] },
            ],
          },
        ],
      },
      {
        name: 'video.scaling',
        label: 'Resolution',
        type: 'select',
        match: true,
        fullWidth: true,
        dependency: ['video.preset'],
        options: [
          {
            value: { width: 4096, height: 2160 },
            label: '4096 x 2160',
          },
          {
            value: { width: 2048, height: 1080 },
            label: '2048 x 1080',
          },
          {
            value: { width: 1920, height: 1080 },
            label: '1920 x 1080',
          },
          {
            value: { width: 1280, height: 720 },
            label: '1280 x 720',
          },
          {
            value: { width: 960, height: 540 },
            label: '960 x 540',
          },
          {
            value: { width: 640, height: 360 },
            label: '640 x 360',
          },
        ],
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
        dependency: ['format'],
        options: [
          {
            value: 'nablet_aac',
            label: 'AAC Nablet',
            dependency: [{ format: 'mp4' }],
          },
          {
            value: 'mp3',
            label: 'MP3',
            dependency: [{ format: 'mp4' }],
          },
        ],
      },
      {
        name: 'audio.preset',
        label: 'Preset',
        type: 'select',
        dependency: ['audio.codec'],
        options: [
          {
            value: ['AAC_LC'],
            label: 'Low complexity',
            dependency: [{ 'audio.codec': 'nablet_aac' }],
          },
        ],
      },
      {
        name: 'audio.sampleRate',
        label: 'Sample rate',
        type: 'select',
        match: true,
        dependency: ['format'],
        options: [
          {
            value: 48,
            label: '48 Khz',
            dependency: [{ format: 'mp4' }],
          },
        ],
      },
      {
        name: 'audio.sampleSize',
        label: 'Sample size',
        type: 'select',
        match: true,
        dependency: ['format'],
        options: [
          {
            value: 16,
            label: '16',
            dependency: [{ format: 'mp4' }],
          },
          {
            value: 24,
            label: '24',
            dependency: [{ format: 'mp4' }],
          },
        ],
      },
    ],
  },
];
