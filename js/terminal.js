
let pwd = ['home', 'shreyas']

filesystem = {
    '/': {
        'home': {
            'shreyas': {
                'readme': 'This is a readme file',
                'hello': 'Hello reader',
                'testdir': {
                    
                }
            }
        }
    }
}

let current_directory = filesystem['/']
let global_pwd_index = 0

while (global_pwd_index < pwd.length) {
    current_directory = current_directory[pwd[global_pwd_index]]
    global_pwd_index++
}

function pwd_tostring() {
    let pwd_str = ''
    for (let i in pwd)
        pwd_str += '/' + pwd[i]

    if (pwd_str === '')
        pwd_str += '/'
    
    return pwd_str.replace('/home/shreyas', '~')
}

$('#terminal').terminal({
    echo: function(what) {
        this.echo(what);
    },
    clear: function() {
        this.clear();
    },
    pwd: function() {
        let pwd_str = ''
        for (let i in pwd)
            pwd_str += '/' + pwd[i]

        if (pwd_str === '')
            pwd_str += '/'

        this.echo(pwd_str)
    },
    ls: function() {
        cur_dir = filesystem['/']
        let pwd_index = 0
        while (pwd_index < pwd.length) {
            cur_dir = cur_dir[pwd[pwd_index]]
            pwd_index++
        }
        for (let i in cur_dir) {
            if (typeof cur_dir[i] === 'string')
                this.echo(i)
            else
                this.echo(`[[;magenta;]${i}]`)
        }
    },
    cat: function(filename) {
        if (current_directory[filename] === undefined) {
            this.error('cat: ' + filename + ': No such file or directory')
        }
        else if (typeof current_directory[filename] !== 'string') {
            this.error('cat: ' + filename + ': Is a directory')
        }
        else {
            this.echo(current_directory[filename])
        }
    },
    cd: function(dirname) {
        if (dirname === '.') {

        }
        else if (dirname === '..') {
            if (pwd.length == 0)
                return
            
            pwd.pop()
            if (pwd.length == 0)
                current_directory = filesystem['/']
            else {
                cur_dir = filesystem['/']
                let pwd_index = 0
                while (pwd_index < pwd.length) {
                    cur_dir = cur_dir[pwd[pwd_index]]
                    pwd_index++
                }
                current_directory = cur_dir
            }
        }
        else if (current_directory[dirname] === undefined) {
            this.error('cat: ' + dirname + ': No such file or directory')
        }
        else if (typeof current_directory[dirname] === 'string') {
            this.error('cat: ' + dirname + ': Not a directory')
        }
        else {
            pwd.push(dirname)
            current_directory = current_directory[dirname]
        }
    }
}, {
    greetings: `[[;dodgerblue;]Welcome to the Linux Game]`,
    height: 400,
    prompt: function() {
        prompt_str1 = 'shreyas@LINUX_GAME:'
        prompt_str2 = pwd_tostring(pwd)
        prompt_str3 = '$ '

        // return prompt_str
        return `[[;green;]${prompt_str1}][[;magenta;]${prompt_str2}][[;white;]${prompt_str3}]`
    }
});