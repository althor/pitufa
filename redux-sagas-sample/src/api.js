const API = {
    async login(username, password) {
      // Simulate API call
      const response = await new Promise((resolve, reject) => {
        setTimeout(() => {
          if (username === 'admin' && password === 'password') {
            resolve({ 
              id: 1, 
              username, 
              token: 'fake-jwt-token' 
            });
          } else {
            reject(new Error('Invalid credentials'));
          }
        }, 1000);
      });
      return response;
    },
  
    async logout() {
      // Simulate logout API call
      return new Promise((resolve) => {
        setTimeout(resolve, 500);
      });
    }
  };