const Election = artifacts.require("Election");

contract("Election", (accounts) => {
  it("should deploy successfully", async () => {
    const instance = await Election.deployed();
    const counts = await instance.GetCount();
    
    // Ensure counts are initialized properly
    assert.equal(counts.red_total, 0, "Red total should be 0");
    assert.equal(counts.blue_total, 0, "Blue total should be 0");
  });
});
