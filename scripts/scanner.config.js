const fs = require('fs')
const glob = require('glob') // eslint-disable-line import/no-extraneous-dependencies
const { Parser } = require('i18next-scanner') // eslint-disable-line import/no-extraneous-dependencies

/**
 * Reads a single file and handles empty, corrupted or non existing files
 *
 * @param {String} path - The exact path to the file
 *
 * @returns {Object} - the parsed value of the file. Empty object if anything goes wring.
 */
async function readFile(path) {
  if (await fs.existsSync(path)) {
    const content = fs.readFileSync(path, 'utf8')
    try {
      return JSON.parse(content)
    } catch (e) {
      return {}
    }
  }
  return {}
}

/**
 * Reads the json files and returns the values in a single object
 *
 * @param {Object} config - The configuration object
 *
 * @returns {Object} - The JSON parsed translations
 */
async function readFiles(config) {
  const translations = {}
  async function read() {
    const i = Object.keys(translations).length
    translations[config.lng[i]] = await readFile(`${config.outputPath}/${config.lng[i]}.json`)
    if (i < config.lng.length - 1) await read()
  }
  await read()
  return translations
}

/**
 * Sets each key and handles plurals
 *
 * @param {Object} parser - The initiated instance of Parser
 * @param {Object} oldTranslations - The translations parsed from the
 * translation json files for the default language
 * @param {String} key - The extracted translation key
 * @param {String} options - parse options
 */
const customHandler = function (parser, oldTranslations, key, options) {
  const value = oldTranslations[key] || key
  if (options.context) {
    key += `_${options.context}`
  }
  parser.set(key, value)
  if (options.count !== undefined) {
    key = `${key}_plural`
    parser.set(key, oldTranslations[key] || '')
  }
}

/**
 * Parses the translations from the jsx files
 *
 * @param {Object} config - The configuration object
 * @param {Object} oldTranslations - The translations parsed from the
 * translation json files for the default language
 */
function parse(config, oldTranslations) {
  const parser = new Parser({
    keySeparator: '>',
    nsSeparator: '|',
  })

  config.files
    .map((filePattern) => glob.sync(filePattern, {}))
    .reduce((accumulator, files) => [...accumulator, ...files], [])
    .forEach((file) => {
      const content = fs.readFileSync(file, 'utf-8')
      parser.parseFuncFromString(
        content,
        { list: config.translationFunctionNames },
        (key, options) => customHandler(parser, oldTranslations, key, options)
      )
    })

  const translations = parser.get({ sort: true }).en.translation
  const oldKeys = Object.keys(oldTranslations)
  // filter by new key to find the new translations
  const newKeys = Object.keys(translations)
    .filter((key) => !oldKeys.includes(key))
    .reduce((accumulator, key) => {
      accumulator[key] = ''
      return accumulator
    }, {})

  return newKeys
}

/**
 * Write s the translations into a single json file for a given language.
 *
 * @param {Object} config - The configuration object
 * @param {String} language - 2 letters language key, e.g. en, de
 * @param {Object} resources - The translations parsed from the
 * translation json files for the given language
 * @param {Object} rawOldKeys - All the translation keys without translation values
 * @param {Object} newKeys - New translation keys parsed from the jsx files
 */
async function writeFile(config, language, resources, rawOldKeys, newKeys) {
  const additionalKeys =
    language === config.defaultLng
      ? Object.keys(newKeys).reduce((acc, key) => {
          acc[key] = key
          return acc
        }, {})
      : newKeys
  const updatedTranslations = {
    ...rawOldKeys,
    ...resources,
    ...additionalKeys,
  }
  const outputJSON = `${JSON.stringify(updatedTranslations, null, 2)}\n`
  fs.writeFileSync(`${config.outputPath}/${language}.json`, outputJSON)
}

/**
 * Writes the new translations in all the translation files
 *
 * @param {Object} config - The configuration object
 * @param {Object} resources - All the translations parsed from the translation json files
 * @param {Object} newKeys - New translation keys parsed from the jsx files
 */
async function writeFiles(config, resources, newKeys) {
  const count = Object.keys(newKeys).length
  const rawOldKeys = Object.keys(resources[config.defaultLng]).reduce((acc, key) => {
    acc[key] = ''
    return acc
  }, {})
  let i = 0
  async function write() {
    const lng = config.lng[i]
    await writeFile(config, lng, resources[lng], rawOldKeys, newKeys)
    i++
    if (i < config.lng.length) await write()
  }

  if (count > 0) {
    await write()
    // eslint-disable-next-line no-console
    console.log(
      `i18nScanner: ${count} translation keys parsed and written to '${config.outputPath}'\n`
    )
  } else {
    // eslint-disable-next-line no-console
    console.log('i18nScanner: No new translations.')
  }
}

async function i18nScanner() {
  const config = {
    translationFunctionNames: ['i18next.t', 'props.t', 'this.props.t', 't'],
    outputPath: './locales/resources',
    files: ['./src/components/**/*.js', './src/constants/**/*.js'],
    lng: ['en', 'de'],
    defaultLng: 'en',
  }

  const resources = await readFiles(config)

  const newKeys = parse(config, resources[config.defaultLng])

  writeFiles(config, resources, newKeys)
}

i18nScanner()
