const { expect } = require("chai");
const { ethers, waffle} = require("hardhat");


describe("Test Project", function () {

    let Test;                   // contract name
    let TestInstance;           // instance name
    
    let owner;
    let addr1;
    let addr2;
    let addrs;
    let provider;

    beforeEach(async function () {
        Test = await ethers.getContractFactory("Test");                 
        [owner, addr1, addr2, ...addrs] = await ethers.getSigners();
        provider = waffle.provider;
        
        TestInstance = await Test.deploy();                             
    });
    
    describe("Testing Functions", function () {
        it("Set Name", async function () {
            const setname = await TestInstance.setName("TestName")
            const name = await TestInstance.getName()

            expect(name).to.equal("TestName")
        })

        it("Get Name", async function () {
            const name = await TestInstance.getName()

            expect(name).not.to.equal("TestName")
        })

        it("Check", async function () {
            await expect(TestInstance.connect(addr1).check()).to.be.revertedWith("Not an Owner");
        })

    })

})