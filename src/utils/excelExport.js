const ExcelJS = require('exceljs');

const STATUS_LABEL = { 0: 'Confirmed', 1: 'Cancelled', 2: 'Completed', 3: 'Pending' };

const exportBookingsToExcel = async (bookings, res) => {
  const workbook  = new ExcelJS.Workbook();
  const worksheet = workbook.addWorksheet('Bookings');

  worksheet.columns = [
    { header: 'Booking ID',      key: 'id',             width: 28 },
    { header: 'Guest Name',      key: 'guestName',      width: 25 },
    { header: 'Guest Email',     key: 'guestEmail',     width: 30 },
    { header: 'Guest Phone',     key: 'guestPhone',     width: 20 },
    { header: 'Hotel Name',      key: 'hotelName',      width: 35 },
    { header: 'Hotel Location',  key: 'hotelLocation',  width: 25 },
    { header: 'City',            key: 'city',           width: 15 },
    { header: 'State',           key: 'state',          width: 15 },
    { header: 'Check-in Date',   key: 'checkInDate',    width: 18 },
    { header: 'No. of Guests',   key: 'numberOfGuests', width: 15 },
    { header: 'Status',          key: 'status',         width: 15 },
    { header: 'Special Requests',key: 'specialRequests',width: 35 },
    { header: 'Booking Date',    key: 'bookingDate',    width: 20 },
  ];

  worksheet.getRow(1).font = { bold: true };
  worksheet.getRow(1).fill = {
    type: 'pattern', pattern: 'solid', fgColor: { argb: 'FF4F81BD' },
  };
  worksheet.getRow(1).font = { bold: true, color: { argb: 'FFFFFFFF' } };

  bookings.forEach((b) => {
    worksheet.addRow({
      id:              b._id.toString(),
      guestName:       b.userId?.name       || '',
      guestEmail:      b.userId?.email      || '',
      guestPhone:      b.userId?.phone      || '',
      hotelName:       b.hotelId?.name      || '',
      hotelLocation:   b.hotelId?.location  || '',
      city:            b.hotelId?.cityId?.name  || '',
      state:           b.hotelId?.stateId?.name || '',
      checkInDate:     b.checkInDate ? new Date(b.checkInDate).toLocaleDateString('en-IN') : '',
      numberOfGuests:  b.numberOfGuests,
      status:          STATUS_LABEL[b.status] ?? 'Unknown',
      specialRequests: b.specialRequests || '',
      bookingDate:     b.bookingDate ? new Date(b.bookingDate).toLocaleDateString('en-IN') : '',
    });
  });

  res.setHeader('Content-Type', 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet');
  res.setHeader('Content-Disposition', `attachment; filename="bookings_${Date.now()}.xlsx"`);

  await workbook.xlsx.write(res);
  res.end();
};

module.exports = { exportBookingsToExcel };
