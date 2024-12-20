export class UserDto {
    id;
    email;
    name;
    likes;
    isActivated;

    constructor(model) {
        this.id = model._id;
        this.email = model.email;
        this.name = model.name;
        this.likes = model.likes;
        this.isActivated = model.isActivated;
        return this;
    }
}
