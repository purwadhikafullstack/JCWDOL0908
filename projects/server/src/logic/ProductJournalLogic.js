const { ProductJournalService } = require("../service");

const getProductJournalLogic = async (dataInput) => {
  const { offset, limit, page } = dataInput;
  try {
    let totalPage;
    if (offset && limit && page) {
      const getTotalDataCounts = await ProductJournalService.getTotalDataCount(dataInput);
      totalPage = Math.ceil(getTotalDataCounts[0].dataCount / limit);
    }
    const productJournal = await ProductJournalService.getProductJournal(dataInput);
    return { error: null, result: { dataToSend: productJournal, totalPage } };
  } catch (error) {
    console.log(error);
    return { error, result: null };
  }
};

const getDetailProductJournalOnAWarehouse = async (dataInput) => {
  try {
    console.log(dataInput);
    const productJournalDetails = await ProductJournalService.getProductJournalDetails(dataInput);
    return { error: null, result: productJournalDetails };
  } catch (error) {
    console.log(error);
    return { error, result: null };
  }
};

module.exports = { getProductJournalLogic, getDetailProductJournalOnAWarehouse };
