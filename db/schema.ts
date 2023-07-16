export const schema = `
@public
collection TodoEr {
  id: string;
  address: string;
  title: string;
  description?: string;
  complete: boolean;
  owner: PublicKey;

  constructor (id: string, address: string, title: string, description?: string) {
    this.id = id;
    this.title = title;
    this.address = address;
    this.description = description;
    this.complete = false;
    this.owner = ctx.publicKey;
  }

  del(){
    if (this.owner != ctx.publicKey) {
        throw error('invalid public key');
    }
    selfdestruct();
  }

  updateTask(title: string, description?: string) {
    if (this.owner != ctx.publicKey) {
        throw error('invalid public key');
    }
    this.title = title;
    this.description = description;
  }

  completeTask() {
    if (this.owner != ctx.publicKey) {
        throw error('invalid public key');
    }
    this.complete = !this.complete;
    }
    
  @index(address);
}`;
