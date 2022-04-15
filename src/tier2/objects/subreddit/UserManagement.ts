
export default class Subreddit_UserManagementSubclass{
    public async addContributor( name: string ): Promise<this>{
		return this.#friend( name, "contributor" );
	}

	public async addWikiContributor( name: string ): Promise<this>{
		return this.#friend( name, "wikicontributor" );
	}

    public async addWikiContributor(options: { name: string; }): Promise<this>;
    public async banUser(options: BanOptions): Promise<this>;

    
}