export const THEME_ABI = [
  {
    inputs: [
      {
        internalType: "enum DefaultTheme.ColorTheme",
        name: "colorTheme",
        type: "uint8",
      },
      { internalType: "enum DefaultTheme.ScreenSize", name: "", type: "uint8" },
    ],
    name: "getTheme",
    outputs: [{ internalType: "string", name: "", type: "string" }],
    stateMutability: "pure",
    type: "function",
  },
] as const;

export const USER_SUMMARY_ABI = [
  {
    inputs: [
      {
        components: [
          { internalType: "string", name: "fid", type: "string" },
          { internalType: "string", name: "username", type: "string" },
          { internalType: "string", name: "displayName", type: "string" },
          {
            components: [
              { internalType: "string", name: "url", type: "string" },
            ],
            internalType: "struct UserSummaryComponent.Pfp",
            name: "pfp",
            type: "tuple",
          },
          {
            components: [
              {
                components: [
                  { internalType: "string", name: "text", type: "string" },
                ],
                internalType: "struct UserSummaryComponent.Bio",
                name: "bio",
                type: "tuple",
              },
            ],
            internalType: "struct UserSummaryComponent.Profile",
            name: "profile",
            type: "tuple",
          },
          { internalType: "uint64", name: "followingCount", type: "uint64" },
          { internalType: "uint64", name: "followerCount", type: "uint64" },
        ],
        internalType: "struct UserSummaryComponent.UserSummary",
        name: "userSummary",
        type: "tuple",
      },
      {
        internalType: "enum CommonStyles.ColorTheme",
        name: "colorTheme",
        type: "uint8",
      },
      {
        internalType: "enum CommonStyles.ScreenSize",
        name: "screenSize",
        type: "uint8",
      },
      { internalType: "address", name: "themeComponent", type: "address" },
    ],
    name: "getComponent",
    outputs: [{ internalType: "string", name: "", type: "string" }],
    stateMutability: "view",
    type: "function",
  },
] as const;

export const FEED_ABI = [
  {
    inputs: [
      {
        components: [
          { internalType: "string", name: "hash", type: "string" },
          { internalType: "string", name: "timeDelta", type: "string" },
          { internalType: "string", name: "text", type: "string" },
          { internalType: "uint64", name: "recastsCount", type: "uint64" },
          { internalType: "uint64", name: "likesCount", type: "uint64" },
          { internalType: "uint64", name: "repliesCount", type: "uint64" },
          {
            components: [
              { internalType: "string", name: "fid", type: "string" },
              { internalType: "string", name: "username", type: "string" },
              { internalType: "string", name: "displayName", type: "string" },
              { internalType: "string", name: "pfpUrl", type: "string" },
            ],
            internalType: "struct CastComponent.Author",
            name: "author",
            type: "tuple",
          },
          { internalType: "bool", name: "isInChannel", type: "bool" },
          {
            components: [
              { internalType: "string", name: "name", type: "string" },
              { internalType: "string", name: "imageUrl", type: "string" },
            ],
            internalType: "struct CastComponent.Channel",
            name: "channel",
            type: "tuple",
          },
          {
            components: [
              { internalType: "bool", name: "isCast", type: "bool" },
              {
                components: [
                  { internalType: "string", name: "hash", type: "string" },
                  { internalType: "string", name: "timeDelta", type: "string" },
                  { internalType: "string", name: "text", type: "string" },
                  {
                    internalType: "uint64",
                    name: "recastsCount",
                    type: "uint64",
                  },
                  {
                    internalType: "uint64",
                    name: "likesCount",
                    type: "uint64",
                  },
                  {
                    internalType: "uint64",
                    name: "repliesCount",
                    type: "uint64",
                  },
                  {
                    components: [
                      { internalType: "string", name: "fid", type: "string" },
                      {
                        internalType: "string",
                        name: "username",
                        type: "string",
                      },
                      {
                        internalType: "string",
                        name: "displayName",
                        type: "string",
                      },
                      {
                        internalType: "string",
                        name: "pfpUrl",
                        type: "string",
                      },
                    ],
                    internalType: "struct CastComponent.Author",
                    name: "author",
                    type: "tuple",
                  },
                  { internalType: "bool", name: "isInChannel", type: "bool" },
                  {
                    components: [
                      { internalType: "string", name: "name", type: "string" },
                      {
                        internalType: "string",
                        name: "imageUrl",
                        type: "string",
                      },
                    ],
                    internalType: "struct CastComponent.Channel",
                    name: "channel",
                    type: "tuple",
                  },
                ],
                internalType: "struct CastComponent.EmbeddedCast",
                name: "cast",
                type: "tuple",
              },
              { internalType: "string", name: "embedUrl", type: "string" },
            ],
            internalType: "struct CastComponent.CastEmbed[]",
            name: "embeds",
            type: "tuple[]",
          },
        ],
        internalType: "struct CastComponent.Cast[]",
        name: "casts",
        type: "tuple[]",
      },
      {
        internalType: "enum CommonStyles.ColorTheme",
        name: "colorTheme",
        type: "uint8",
      },
      {
        internalType: "enum CommonStyles.ScreenSize",
        name: "screenSize",
        type: "uint8",
      },
      { internalType: "address", name: "themeComponent", type: "address" },
    ],
    name: "getComponent",
    outputs: [{ internalType: "string", name: "", type: "string" }],
    stateMutability: "view",
    type: "function",
  },
] as const;

export const CAST_ABI = [
  {
    inputs: [
      {
        components: [
          { internalType: "string", name: "hash", type: "string" },
          { internalType: "string", name: "timeDelta", type: "string" },
          { internalType: "string", name: "text", type: "string" },
          { internalType: "uint64", name: "recastsCount", type: "uint64" },
          { internalType: "uint64", name: "likesCount", type: "uint64" },
          { internalType: "uint64", name: "repliesCount", type: "uint64" },
          {
            components: [
              { internalType: "string", name: "fid", type: "string" },
              { internalType: "string", name: "username", type: "string" },
              { internalType: "string", name: "displayName", type: "string" },
              { internalType: "string", name: "pfpUrl", type: "string" },
            ],
            internalType: "struct CastComponent.Author",
            name: "author",
            type: "tuple",
          },
          { internalType: "bool", name: "isInChannel", type: "bool" },
          {
            components: [
              { internalType: "string", name: "name", type: "string" },
              { internalType: "string", name: "imageUrl", type: "string" },
            ],
            internalType: "struct CastComponent.Channel",
            name: "channel",
            type: "tuple",
          },
          {
            components: [
              { internalType: "bool", name: "isCast", type: "bool" },
              {
                components: [
                  { internalType: "string", name: "hash", type: "string" },
                  { internalType: "string", name: "timeDelta", type: "string" },
                  { internalType: "string", name: "text", type: "string" },
                  {
                    internalType: "uint64",
                    name: "recastsCount",
                    type: "uint64",
                  },
                  {
                    internalType: "uint64",
                    name: "likesCount",
                    type: "uint64",
                  },
                  {
                    internalType: "uint64",
                    name: "repliesCount",
                    type: "uint64",
                  },
                  {
                    components: [
                      { internalType: "string", name: "fid", type: "string" },
                      {
                        internalType: "string",
                        name: "username",
                        type: "string",
                      },
                      {
                        internalType: "string",
                        name: "displayName",
                        type: "string",
                      },
                      {
                        internalType: "string",
                        name: "pfpUrl",
                        type: "string",
                      },
                    ],
                    internalType: "struct CastComponent.Author",
                    name: "author",
                    type: "tuple",
                  },
                  { internalType: "bool", name: "isInChannel", type: "bool" },
                  {
                    components: [
                      { internalType: "string", name: "name", type: "string" },
                      {
                        internalType: "string",
                        name: "imageUrl",
                        type: "string",
                      },
                    ],
                    internalType: "struct CastComponent.Channel",
                    name: "channel",
                    type: "tuple",
                  },
                ],
                internalType: "struct CastComponent.EmbeddedCast",
                name: "cast",
                type: "tuple",
              },
              { internalType: "string", name: "embedUrl", type: "string" },
            ],
            internalType: "struct CastComponent.CastEmbed[]",
            name: "embeds",
            type: "tuple[]",
          },
        ],
        internalType: "struct CastComponent.Cast",
        name: "cast",
        type: "tuple",
      },
      {
        internalType: "enum CommonStyles.ColorTheme",
        name: "colorTheme",
        type: "uint8",
      },
      {
        internalType: "enum CommonStyles.ScreenSize",
        name: "screenSize",
        type: "uint8",
      },
      { internalType: "address", name: "themeComponent", type: "address" },
    ],
    name: "getComponent",
    outputs: [{ internalType: "string", name: "", type: "string" }],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [
      {
        components: [
          { internalType: "string", name: "hash", type: "string" },
          { internalType: "string", name: "timeDelta", type: "string" },
          { internalType: "string", name: "text", type: "string" },
          { internalType: "uint64", name: "recastsCount", type: "uint64" },
          { internalType: "uint64", name: "likesCount", type: "uint64" },
          { internalType: "uint64", name: "repliesCount", type: "uint64" },
          {
            components: [
              { internalType: "string", name: "fid", type: "string" },
              { internalType: "string", name: "username", type: "string" },
              { internalType: "string", name: "displayName", type: "string" },
              { internalType: "string", name: "pfpUrl", type: "string" },
            ],
            internalType: "struct CastComponent.Author",
            name: "author",
            type: "tuple",
          },
          { internalType: "bool", name: "isInChannel", type: "bool" },
          {
            components: [
              { internalType: "string", name: "name", type: "string" },
              { internalType: "string", name: "imageUrl", type: "string" },
            ],
            internalType: "struct CastComponent.Channel",
            name: "channel",
            type: "tuple",
          },
          {
            components: [
              { internalType: "bool", name: "isCast", type: "bool" },
              {
                components: [
                  { internalType: "string", name: "hash", type: "string" },
                  { internalType: "string", name: "timeDelta", type: "string" },
                  { internalType: "string", name: "text", type: "string" },
                  {
                    internalType: "uint64",
                    name: "recastsCount",
                    type: "uint64",
                  },
                  {
                    internalType: "uint64",
                    name: "likesCount",
                    type: "uint64",
                  },
                  {
                    internalType: "uint64",
                    name: "repliesCount",
                    type: "uint64",
                  },
                  {
                    components: [
                      { internalType: "string", name: "fid", type: "string" },
                      {
                        internalType: "string",
                        name: "username",
                        type: "string",
                      },
                      {
                        internalType: "string",
                        name: "displayName",
                        type: "string",
                      },
                      {
                        internalType: "string",
                        name: "pfpUrl",
                        type: "string",
                      },
                    ],
                    internalType: "struct CastComponent.Author",
                    name: "author",
                    type: "tuple",
                  },
                  { internalType: "bool", name: "isInChannel", type: "bool" },
                  {
                    components: [
                      { internalType: "string", name: "name", type: "string" },
                      {
                        internalType: "string",
                        name: "imageUrl",
                        type: "string",
                      },
                    ],
                    internalType: "struct CastComponent.Channel",
                    name: "channel",
                    type: "tuple",
                  },
                ],
                internalType: "struct CastComponent.EmbeddedCast",
                name: "cast",
                type: "tuple",
              },
              { internalType: "string", name: "embedUrl", type: "string" },
            ],
            internalType: "struct CastComponent.CastEmbed[]",
            name: "embeds",
            type: "tuple[]",
          },
        ],
        internalType: "struct CastComponent.Cast",
        name: "cast",
        type: "tuple",
      },
    ],
    name: "getInnerCast",
    outputs: [{ internalType: "string", name: "", type: "string" }],
    stateMutability: "pure",
    type: "function",
  },
] as const;
