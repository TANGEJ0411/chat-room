module.exports = {
    'env': {
        'browser': true,
        'es2021': true,
        'node': true
    },
    'extends': [
        'eslint:recommended',
        'plugin:react/recommended',
        'plugin:react-hooks/recommended'
    ],
    'overrides': [
    ],
    'parserOptions': {
        'ecmaVersion': 'latest',
        'sourceType': 'module',
        'ecmaFeatures': {
            'jsx': true
        }
    },
    'plugins': [
        'react',
        'import'
    ],
    'rules': {
        // 禁止連續賦值寫法
        'no-multi-assign': 'error',
        // 禁止屬性前有空白
        'no-whitespace-before-property': 'error',
        // 強制使用駱駝拼寫法
        camelcase: [
            'error',
            {
                'properties': 'always',
                'ignoreDestructuring': false
            }
        ],
        // 強制鍵和值之間使用一致的空格
        'key-spacing': [
            'error',
            {
                // 強制在冒號前後只有一個空格
                'mode': 'strict',
                // 強制在冒號和值之間存在至少有一個空格
                'afterColon': true,
                // 禁止鍵和冒號之間存在空格
                'beforeColon': false
            }
        ],
        // 禁止在函數標識符和其調用之間有空格
        'func-call-spacing': [
            'error',
            'never'
        ],
        // 禁止文件末尾存在空行
        'eol-last': [
            'error',
            'never'
        ],
        // 強制使用一致的逗號風格
        'comma-style': [
            'error',
            'last'
        ],
        // 強制使用 Windows 換行符
        'linebreak-style': [
            'error',
            'windows'
        ],
        // 強制使用一致的單引號
        // 'quotes': [
        //     'error',
        //     'single'
        // ],
        // 強制使用一致的分號
        'semi': [
            'error',
            'always'
        ],
        // 要求使用 const 聲明那些聲明後不再被修改的變量
        'prefer-const': [
            'error',
            {
                'destructuring': 'any',
                'ignoreReadBeforeAssign': false
            }
        ],
        // 要求使用 let 或 const 而不是 var
        'no-var': 'error',
        // 禁止在 import 和 export 和解構賦值時將引用重命名為相同的名字
        'no-useless-rename': ['error', {
            'ignoreDestructuring': false,
            'ignoreImport': false,
            'ignoreExport': false
        }],
        // 引入路徑大小寫檢查
        'import/no-unresolved': ['error', { 'caseSensitive': true }]
    },
    'settings': {
        'import/resolver': {
            'node': {
                'extensions': ['.js', '.jsx']
            }
        }
    }
};