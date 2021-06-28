export default [
  {
    title: 'General',
    fields: [
      {
        name: 'name',
        label: 'Name',
        type: 'text',
        placeholder: 'Name of tag...',
        fullWidth: true,
      },
      {
        name: 'description',
        label: 'Description',
        type: 'text',
        placeholder: 'Description of tag...',
        fullWidth: true,
      },
      {
        name: 'format',
        label: 'Format',
        type: 'select',
        fullWidth: true,
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
        name: 'createPreview',
        label: 'Create preview',
        type: 'checkbox',
        fullWidth: true,
      },
      {
        name: 'createThumbnails',
        label: 'Create thumbnails',
        type: 'checkbox',
        fullWidth: true,
      },
    ],
  },
  // {
  //   title: 'Container',
  //   expandable: false,
  //   fields: [
  //     {
  //       name: 'format',
  //       label: 'Format',
  //       type: 'select',
  //       required: true,
  //       fullWidth: true,
  //       options: [
  //         {
  //           value: 'mp4',
  //           label: 'MP4',
  //         },
  //         {
  //           value: 'mpv',
  //           label: 'MOV',
  //         },
  //       ],
  //     },
  //   ],
  // },
  {
    title: 'Video',
    fields: [
      {
        name: 'video.codec',
        label: 'Codec',
        type: 'select',
        options: [
          {
            value: 'h264',
            label: 'H264',
          },
        ],
      },
      {
        name: 'video.preset',
        label: 'Preset',
        type: 'select',
        options: [
          {
            value: 'baseline',
            label: 'Baseline',
          },
          {
            value: 'ipod',
            label: 'Ipod',
          },
          {
            value: 'main',
            label: 'Main',
          },
          {
            value: 'high',
            label: 'High',
          },
        ],
      },
      {
        name: 'video.framerate',
        label: 'Framerate',
        type: 'select',
        match: false,
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
        options: [
          {
            value: 1000000,
            label: '1 Mbit/s',
          },
          {
            value: 2000000,
            label: '2 Mbit/s',
          },
          {
            value: 3000000,
            label: '3 Mbit/s',
          },
          {
            value: 4000000,
            label: '4 Mbit/s',
          },
          {
            value: 5000000,
            label: '5 Mbit/s',
          },
          {
            value: 6000000,
            label: '6 Mbit/s',
          },
          {
            value: 7000000,
            label: '7 Mbit/s',
          },
          {
            value: 8000000,
            label: '8 Mbit/s',
          },
          {
            value: 9000000,
            label: '9 Mbit/s',
          },
          {
            value: 10000000,
            label: '10 Mbit/s',
          },
          {
            value: 11000000,
            label: '11 Mbit/s',
          },
          {
            value: 12000000,
            label: '12 Mbit/s',
          },
          {
            value: 15000000,
            label: '15 Mbit/s',
          },
          {
            value: 20000000,
            label: '20 Mbit/s',
          },
          {
            value: 25000000,
            label: '25 Mbit/s',
          },
          {
            value: 30000000,
            label: '30 Mbit/s',
          },
          {
            value: 50000000,
            label: '50 Mbit/s',
          },
        ],
      },
      {
        name: 'video.resolution',
        label: 'Resolution',
        type: 'select',
        match: false,
        fullWidth: true,
        options: [
          {
            value: '640x360',
            label: '640 x 360',
          },
          {
            value: '960x540',
            label: '960 x 540',
          },
          {
            value: '1280x720',
            label: '1280 x 720',
          },
          {
            value: '1920x1080',
            label: '1920 x 1080',
          },
          {
            value: '2048x1080',
            label: '2048 x 1080',
          },
          {
            value: '4096x2160',
            label: '4096 x 2160',
          },
        ],
      },
    ],
  },
  {
    title: 'Audio',
    fields: [
      {
        name: 'audio.codec',
        label: 'Codec',
        type: 'select',
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
        options: [
          {
            value: 'AAC_LC',
            label: 'Low complexity',
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
