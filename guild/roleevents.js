const roleadd = require("./roleadd");
const roledelete = require("./roledelete");
module.exports = {
	async execute(role,cooldownUser,add) {
        try {
            switch (add) {
                case true:
                    roleadd.execute(role)
                break;
                case false:
                    roledelete.execute(role)
                break;
            }
        } finally {
            setTimeout(() => {
                cooldownUser.delete(role.id);
            }, 5*1000);
        }
    }
};
