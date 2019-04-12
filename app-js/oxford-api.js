
var Dictionary = require("oxford-dictionary-api");

function findWordOxford() {

  var app_id = "1173d420";
  var app_key = "fd07bff2c06f70752c2a3ee36a3c5bab";
  var dict = new Dictionary(app_id, app_key);
  // console.log(dict)
  dict.find("giaours/definitions", function (error, data) {
    // dict.find("ace", function (error, data) {
    if (error) return console.log("ERROR:", error);
    console.log(data);

    data.results[0].lexicalEntries.forEach((lexicalEntry, i, arr) => {
      // console.log('\n\n' + i, lexicalEntry.entries, '\n')      

      lexicalEntry.entries.forEach((entry, j, arr ) => {
        // console.log('\n\n' + i, entry.senses, '\n')

        entry.senses.forEach(((senses, k , arr ) => {
          console.log('\n\n' + i + " " + j +" " +  k, senses.definitions[0], '\n')
  

        }))
      })
    })

  });
}

module.exports = findWordOxford;



let ob = {
  "metadata": {
    "provider": "Oxford University Press"
  },
  "results": [
    {
      "id": "ace",
      "language": "en",
      "lexicalEntries": [
        {
          "entries": [
            {
              "etymologies": [
                "Middle English (denoting the ‘one’ on dice): via Old French from Latin as ‘unity, a unit’"
              ],
              "grammaticalFeatures": [
                {
                  "text": "Singular",
                  "type": "Number"
                }
              ],
              "homographNumber": "100",
              "senses": [
                {
                  "definitions": [
                    "a playing card with a single spot on it, ranked as the highest card in its suit in most card games"
                  ],
                  "domains": [
                    "Cards"
                  ],
                  "examples": [
                    {
                      "registers": [
                        "figurative"
                      ],
                      "text": "life had started dealing him aces again"
                    },
                    {
                      "text": "the ace of diamonds"
                    }
                  ],
                  "id": "m_en_gbus0005680.006",
                  "short_definitions": [
                    "playing card with single spot on it, ranked as highest card in its suit in most card games"
                  ]
                },
                {
                  "definitions": [
                    "a person who excels at a particular sport or other activity"
                  ],
                  "domains": [
                    "Sport"
                  ],
                  "examples": [
                    {
                      "text": "a motorcycle ace"
                    }
                  ],
                  "id": "m_en_gbus0005680.010",
                  "registers": [
                    "informal"
                  ],
                  "short_definitions": [
                    "person who excels at particular sport or other activity"
                  ],
                  "subsenses": [
                    {
                      "definitions": [
                        "a pilot who has shot down many enemy aircraft"
                      ],
                      "domains": [
                        "Air Force"
                      ],
                      "examples": [
                        {
                          "text": "a Battle of Britain ace"
                        }
                      ],
                      "id": "m_en_gbus0005680.011",
                      "short_definitions": [
                        "pilot who has shot down many enemy aircraft"
                      ]
                    }
                  ],
                  "thesaurusLinks": [
                    {
                      "entry_id": "ace",
                      "sense_id": "t_en_gb0000173.001"
                    }
                  ]
                },
                {
                  "definitions": [
                    "(in tennis and similar games) a service that an opponent is unable to return and thus wins a point"
                  ],
                  "domains": [
                    "Tennis"
                  ],
                  "examples": [
                    {
                      "text": "Nadal banged down eight aces in the set"
                    }
                  ],
                  "id": "m_en_gbus0005680.013",
                  "short_definitions": [
                    "(in tennis and similar games) service that opponent is unable to return and thus wins point"
                  ],
                  "subsenses": [
                    {
                      "definitions": [
                        "a hole in one"
                      ],
                      "domains": [
                        "Golf"
                      ],
                      "examples": [
                        {
                          "text": "his hole in one at the 15th was Senior's second ace as a professional"
                        }
                      ],
                      "id": "m_en_gbus0005680.014",
                      "registers": [
                        "informal"
                      ],
                      "short_definitions": [
                        "hole in one"
                      ]
                    }
                  ]
                }
              ]
            },
            {
              "etymologies": [
                "early 21st century: abbreviation of asexual, with alteration of spelling on the model of ace"
              ],
              "grammaticalFeatures": [
                {
                  "text": "Singular",
                  "type": "Number"
                }
              ],
              "homographNumber": "200",
              "senses": [
                {
                  "definitions": [
                    "a person who has no sexual feelings or desires"
                  ],
                  "domains": [
                    "Sex"
                  ],
                  "examples": [
                    {
                      "text": "both asexual, they have managed to connect with other aces offline"
                    }
                  ],
                  "id": "m_en_gbus1190638.004",
                  "short_definitions": [
                    "asexual person"
                  ]
                }
              ]
            }
          ],
          "language": "en",
          "lexicalCategory": "Noun",
          "pronunciations": [
            {
              "audioFile": "http://audio.oxforddictionaries.com/en/mp3/ace_1_gb_1_abbr.mp3",
              "dialects": [
                "British English"
              ],
              "phoneticNotation": "IPA",
              "phoneticSpelling": "eɪs"
            }
          ],
          "text": "ace"
        },
        {
          "entries": [
            {
              "grammaticalFeatures": [
                {
                  "text": "Positive",
                  "type": "Degree"
                }
              ],
              "homographNumber": "101",
              "senses": [
                {
                  "definitions": [
                    "very good"
                  ],
                  "examples": [
                    {
                      "text": "Ace! You've done it!"
                    },
                    {
                      "text": "an ace swimmer"
                    }
                  ],
                  "id": "m_en_gbus0005680.016",
                  "registers": [
                    "informal"
                  ],
                  "short_definitions": [
                    "very good"
                  ],
                  "thesaurusLinks": [
                    {
                      "entry_id": "ace",
                      "sense_id": "t_en_gb0000173.002"
                    }
                  ]
                }
              ]
            },
            {
              "grammaticalFeatures": [
                {
                  "text": "Positive",
                  "type": "Degree"
                }
              ],
              "homographNumber": "201",
              "senses": [
                {
                  "definitions": [
                    "(of a person) having no sexual feelings or desires; asexual"
                  ],
                  "domains": [
                    "Sex"
                  ],
                  "examples": [
                    {
                      "text": "I didn't realize that I was ace for a long time"
                    }
                  ],
                  "id": "m_en_gbus1190638.006",
                  "short_definitions": [
                    "asexual"
                  ]
                }
              ]
            }
          ],
          "language": "en",
          "lexicalCategory": "Adjective",
          "pronunciations": [
            {
              "audioFile": "http://audio.oxforddictionaries.com/en/mp3/ace_1_gb_1_abbr.mp3",
              "dialects": [
                "British English"
              ],
              "phoneticNotation": "IPA",
              "phoneticSpelling": "eɪs"
            }
          ],
          "text": "ace"
        },
        {
          "entries": [
            {
              "grammaticalFeatures": [
                {
                  "text": "Transitive",
                  "type": "Subcategorization"
                },
                {
                  "text": "Present",
                  "type": "Tense"
                }
              ],
              "homographNumber": "102",
              "senses": [
                {
                  "definitions": [
                    "(in tennis and similar games) serve an ace against (an opponent)"
                  ],
                  "domains": [
                    "Tennis"
                  ],
                  "examples": [
                    {
                      "text": "he can ace opponents with serves of no more than 62 mph"
                    }
                  ],
                  "id": "m_en_gbus0005680.020",
                  "registers": [
                    "informal"
                  ],
                  "short_definitions": [
                    "(in tennis and similar games) serve ace against"
                  ],
                  "subsenses": [
                    {
                      "definitions": [
                        "score an ace on (a hole) or with (a shot)"
                      ],
                      "domains": [
                        "Golf"
                      ],
                      "examples": [
                        {
                          "text": "there was a prize for the first player to ace the hole"
                        }
                      ],
                      "id": "m_en_gbus0005680.026",
                      "short_definitions": [
                        "score ace on hole or with"
                      ]
                    }
                  ]
                },
                {
                  "definitions": [
                    "achieve high marks in (a test or exam)"
                  ],
                  "examples": [
                    {
                      "text": "I aced my grammar test"
                    }
                  ],
                  "id": "m_en_gbus0005680.028",
                  "regions": [
                    "North American"
                  ],
                  "registers": [
                    "informal"
                  ],
                  "short_definitions": [
                    "achieve high marks in"
                  ],
                  "subsenses": [
                    {
                      "definitions": [
                        "outdo someone in a competitive situation"
                      ],
                      "examples": [
                        {
                          "text": "the magazine won an award, acing out its rivals"
                        }
                      ],
                      "id": "m_en_gbus0005680.029",
                      "notes": [
                        {
                          "text": "\"ace someone out\"",
                          "type": "wordFormNote"
                        }
                      ],
                      "short_definitions": [
                        "outdo someone in competitive situation"
                      ]
                    }
                  ]
                }
              ]
            }
          ],
          "language": "en",
          "lexicalCategory": "Verb",
          "pronunciations": [
            {
              "audioFile": "http://audio.oxforddictionaries.com/en/mp3/ace_1_gb_1_abbr.mp3",
              "dialects": [
                "British English"
              ],
              "phoneticNotation": "IPA",
              "phoneticSpelling": "eɪs"
            }
          ],
          "text": "ace"
        }
      ],
      "type": "headword",
      "word": "ace"
    }
  ]
}

