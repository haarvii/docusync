import simpleGit from 'simple-git';

export class GitService {
    constructor() {
        this.git = simpleGit();
    }

    async isRepo() {
        return this.git.checkIsRepo();
    }

    async getDiff(staged = true) {
        const options = staged ? ['--staged'] : ['HEAD'];
        return this.git.diff(options);
    }

    async getStatus() {
        return this.git.status();
    }
}
